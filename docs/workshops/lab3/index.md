--8<-- "snippets/send-bizevent/3-aks-lab.js"

# Lab 3: Azure Kubernetes Observability with Dynatrace

## 3.1 Intro

### The Challenge of Kubernetes Observability

Kubernetes has become the standard for container orchestration, but its dynamic and ephemeral nature creates unique observability challenges. Pods scale up and down automatically, containers are short-lived, and the sheer volume of components—clusters, nodes, namespaces, deployments, services, and pods—makes it difficult to understand what's happening across your environment.

**Common Kubernetes monitoring challenges:**

- **Dynamic workloads** — Pods and containers are constantly created and destroyed, making traditional monitoring approaches ineffective
- **Multi-layer complexity** — Issues can originate from infrastructure, platform, or application layers, requiring correlation across all three
- **Resource optimization** — Understanding actual resource usage vs. requested resources is critical for cost control and performance
- **Security vulnerabilities** — Container images and dependencies can introduce vulnerabilities that are difficult to track at scale

### What You'll Do in This Lab

In this lab, you'll deploy the Dynatrace Operator to an Azure Kubernetes Service (AKS) cluster and experience how Dynatrace provides full-stack observability for Kubernetes environments. You'll deploy a sample microservices application, analyze cluster health, identify resource optimization opportunities, troubleshoot application issues, and detect security vulnerabilities—all from a single platform.

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
