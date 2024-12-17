output "acr_login_server" {
  value = azurerm_container_registry.acr.login_server
}
output "aks_cluster_name" {
  value = azurerm_kubernetes_cluster.aks.name
}
output "aks_resource_group" {
  value = azurerm_resource_group.rg.name
}
output "postgresql_fqdn" {
  value = azurerm_postgresql_server.postgresql.fqdn
}