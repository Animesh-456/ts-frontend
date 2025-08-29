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

module "ecs" {
  source = "terraform-aws-modules/ecs/aws"

  cluster_name = "ecs-integrated"

  cluster_configuration = {
    execute_command_configuration = {
      logging = "OVERRIDE"
      log_configuration = {
        cloud_watch_log_group_name = "/aws/ecs/aws-ec2"
      }
    }
  }

  # Cluster capacity providers
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

      # Container definition(s)
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

          # Example image used requires access to write to root filesystem
          readonlyRootFilesystem = false

          enable_cloudwatch_logging = false
          memoryReservation         = 100

          environment = [
            {
              name  = "REACT_APP_FRONTEND_ROUTE"
              value = var.frontend_url
            },
            {
              name  = "REACT_APP_BACKEND_FILE_ROUTE"
              value = var.backend_file_url
            },
            {
              name  = "REACT_APP_BACKEND_URL"
              value = var.backend_url
            }
          ]
        }
      }

      subnet_ids = data.aws_subnets.available.ids
      security_group_ingress_rules = {
        ingress_3000 = {
          description = "Service port"
          from_port   = 80 # React app typically runs on port 3000
          to_port     = 80
          ip_protocol = "tcp"
          cidr_ipv4   = "0.0.0.0/0" # Allow from anywhere - restrict this in production
        }
      }
      security_group_egress_rules = {
        all = {
          ip_protocol = "-1"
          cidr_ipv4   = "0.0.0.0/0"
        }
      }

      # Add service connect configuration
      service_connect_configuration = {
        deployment_maximum_percent         = 200
        deployment_minimum_healthy_percent = 100
        desired_count                      = 2
        enable_execute_command             = true
      }
    }
  }

  tags = {
    Environment = "Development"
    Project     = "TaskSync"
  }
}