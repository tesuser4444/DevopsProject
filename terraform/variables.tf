
variable "subscription_id" {
  
}
variable "resource_group_name" {
  default = "devopsa"
}
variable "location" {
  default = "West US"
}
variable "acr_name" {
  default = "jorgetirado222"
}
variable "aks_cluster_name" {
  default = "messages"
}
variable "dns_prefix" {
  default = "kube"
}
variable "node_count" {
  default = 1
}
variable "postgresql_server_name" {
  default = "dbserver102938"
}
variable "postgresql_admin_login" {
  default = "psqladmin"
}
variable "postgresql_admin_password" {
  default = "LtnPRBr0"
}
variable "postgresql_database_name" {
  default = "mensajes"
}