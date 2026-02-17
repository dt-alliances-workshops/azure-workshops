--8<-- "snippets/send-bizevent/3-aks-lab.js"

# Lab 3: Azure Kubernetes Observability with Dynatrace

## 3.1 Intro

Re-hosting (also referred to as lift and shift) is a common migration use case. Re-architecture and Re-platform are steps that break the traditional architectures and replace individual components with cloud services and microservices.

We just learned how we can get great information on services, processes and user requests using Dynatrace and OneAgent. This helps us now decide what individual features or complete applications based on business benefits we need to migrate and modernize. The idea here is to focus on feature-based business benefit with functional migration.

### Objectives of this Lab

🔷 Install the Dynatrace Operator and sample application on AKS

🔷 Use the Kubernetes app to analyze cluster health and troubleshoot unhealthy nodes

🔷 Identify underutilized workloads and optimize resource allocation using DQL

🔷 Troubleshoot workload issues using Application Observability and Dynatrace Intelligence

🔷 Detect and analyze application security vulnerabilities in workloads

### Lab Sections

| Section | Description |
|---------|-------------|
| 3.2 Deploy Operator | Install Dynatrace Operator via Azure Portal |
| 3.3 Deploy App | Deploy the sample application to AKS |
| 3.4 Cluster Health | Assess cluster health and performance |
| 3.5 Resource Optimization | Identify underutilized workloads |
| 3.6 Troubleshooting | Use Application Observability and Dynatrace Intelligence |
| 3.7 Security | Detect application security vulnerabilities |
| 3.8 Summary | Review what you accomplished |
