
provider "aws" {
  region = var.aws_region
}

data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "available" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }

  filter {
    name   = "availability-zone"
    values = ["ap-south-1a", "ap-south-1b"]
  }
}

# Service Discovery namespace (still needed for internal service-to-service comms)
resource "aws_service_discovery_private_dns_namespace" "this" {
  name        = "tasksync.local"
  description = "Service Discovery namespace for TaskSync"
  vpc         = data.aws_vpc.default.id
}

# Create ALB
resource "aws_lb" "frontend" {
  name               = "frontend-alb"
  load_balancer_type = "application"
  internal           = false
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = data.aws_subnets.available.ids

  tags = {
    Environment = "Development"
    Project     = "TaskSync"
  }
}

# Security Group for ALB
resource "aws_security_group" "alb_sg" {
  name        = "frontend-alb-sg"
  description = "Allow HTTP traffic"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Target group for ECS frontend service
resource "aws_lb_target_group" "frontend" {
  name        = "frontend-tg"
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = data.aws_vpc.default.id

  health_check {
    path                = "/"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200-399"
  }
}

# Listener for ALB
resource "aws_lb_listener" "frontend" {
  load_balancer_arn = aws_lb.frontend.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend.arn
  }
}

# ECS Cluster + Service
module "ecs" {
  source = "terraform-aws-modules/ecs/aws"

  cluster_name = "ecs-integrated"

  cluster_configuration = {
    execute_command_configuration = {
      logging = "OVERRIDE"
      log_configuration = {
        cloud_watch_log_group_name = "/aws/ecs/ecs-integrated"
        create_group               = false
      }
    }
  }

  default_capacity_provider_strategy = {
    FARGATE = {
      weight = 50
      base   = 20
    }
    FARGATE_SPOT = {
      weight = 50
    }
  }

  services = {
    tasksync-frontend = {
      cpu    = 1024
      memory = 4096

      container_definitions = {
        ecs-sample = {
          cpu       = 512
          memory    = 1024
          essential = true
          image     = var.frontend_image
          portMappings = [
            {
              name          = "ecs-sample"
              containerPort = 80
              protocol      = "tcp"
            }
          ]
          readonlyRootFilesystem = false

          enable_cloudwatch_logging = true
          log_configuration = {
            logDriver = "awslogs"
            options = {
              awslogs-group         = "/ecs/tasksync-frontend"
              awslogs-region        = var.aws_region
              awslogs-stream-prefix = "frontend"
            }
          }
          memoryReservation = 100

          environment = [
            { name = "REACT_APP_FRONTEND_ROUTE", value = var.frontend_url },
            { name = "REACT_APP_BACKEND_FILE_ROUTE", value = var.backend_file_url },
            { name = "REACT_APP_BACKEND_URL", value = var.backend_url }
          ]
        }
      }

      subnet_ids = data.aws_subnets.available.ids

      security_group_ingress_rules = {
        ingress_80 = {
          description                  = "Allow traffic from ALB"
          from_port                    = 80
          to_port                      = 80
          ip_protocol                  = "tcp"
          referenced_security_group_id = aws_security_group.alb_sg.id
        }
      }


      security_group_egress_rules = {
        all = {
          ip_protocol = "-1"
          cidr_ipv4   = "0.0.0.0/0"
        }
      }

      # ✅ FIXED: use load_balancers instead of load_balancer
      load_balancers = [
        {
          target_group_arn = aws_lb_target_group.frontend.arn
          container_name   = "ecs-sample"
          container_port   = 80
        }
      ]

      service_connect_configuration = {
        namespace                          = aws_service_discovery_private_dns_namespace.this.name
        deployment_maximum_percent         = 200
        deployment_minimum_healthy_percent = 100
        desired_count                      = 2
        enable_execute_command             = true
        service = [{
          port_name      = "ecs-sample"
          discovery_name = "frontend"
          client_alias = {
            port     = 80
            dns_name = "frontend"
          }
        }]
      }
    }
  }

  tags = {
    Environment = "Development"
    Project     = "TaskSync"
  }
}

output "frontend_alb_dns" {
  value = aws_lb.frontend.dns_name
}
