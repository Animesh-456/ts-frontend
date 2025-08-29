variable "aws_region" {
  description = "AWS region to deploy resources in"
  type        = string
}
variable "frontend_image" {
  description = "value for frontend_image"
  type        = string
}
# variable "subnet_ids" {
#   description = "List of subnet IDs for ECS service"
#   type        = list(string)
# }


variable "frontend_url" {
  description = "Frontend URL"
  type        = string
}

variable "backend_file_url" {
  description = "Backend file URL"
  type        = string
}

variable "backend_url" {
  description = "Backend URL"
  type        = string
}