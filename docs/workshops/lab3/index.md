--8<-- "snippets/send-bizevent/3-aks-lab.js"

# Lab 3: Azure Kubernetes Observability with Dynatrace

## 3.1 Intro

Re-hosting (also referred to as lift and shift) is a common migration use case. Re-architecture and Re-platform are steps that break the traditional architectures and replace individual components with cloud services and microservices.

We just learned how we can get great information on services, processes and user requests using Dynatrace and OneAgent. This helps us now decide what individual features or complete applications based on business benefits we need to migrate and modernize. The idea here is to focus on feature-based business benefit with functional migration.

### Review - Modernize the Sample App

As we saw earlier, the sample application is a three-tiered application --> frontend, backend, database.

For our lab, another version of the application exists that breaks out each of these backend services into separate services. By putting these services into Docker images, we gain the ability to deploy the service into modern platforms like Azure Kubernetes and Cloud managed services such as the ones from Azure shown below.

![image](img/lab4-app-architecture.png)

The picture below shows how the components of the sample application interact with Dynatrace.

![image](img/lab2-setup.png)

**#1 . Sample Application** - Representing a "services" architecture of a frontend and multiple backend services implemented as Docker containers that we will review in this lab.

**#2 . Azure Kubernetes Service (AKS)** -  is hosting the application. The Kubernetes cluster had the Dynatrace OneAgent Operator installed. (see below for more details).  Two AKS nodes make up the Kubernetes cluster. The Dynatrace OneAgent was preinstalled by the OneAgent operator and is sending data to your Dynatrace SaaS environment. (see below for more details)

**#3 . Dynatrace Operator** - Dynatrace OneAgent is container-aware and comes with built-in support for out-of-the-box monitoring of Kubernetes. Dynatrace supports full-stack monitoring for Kubernetes, from the application down to the infrastructure layer.

**#4 . Dynatrace tenant** is where monitoring data is collected and analyzed.

**#5 . Full-Stack Dashboard** - Made possible by the Dynatrace OneAgent that will automatically instrument each running node & pod in AKS.

**#6 . Kubernetes Dashboard** - The Kubernetes page provides an overview of all Kubernetes clusters showing monitoring data like the clusters' sizing and utilization.

??? info
    📓 Beyond the Lab, over time, you can imagine that this sample application will be further changed to add in other technologies like Azures serverless and other PaaS services like Azures SQL or Cosmo DB databases and virtual networking Application gateways as shown in the picture below.

    ![image](img/lab4-app-architecture-future.png)

### Objectives of this Lab

🔷 Install the Dynatrace Operator and sample application on AKS

🔷 Review how the sample application went from a simple architecture to multiple microservices

🔷 Use the Kubernetes app to analyze cluster health and troubleshoot unhealthy nodes

🔷 Identify underutilized workloads and optimize resource allocation using DQL

🔷 Troubleshoot workload issues using Application Observability and Davis AI

🔷 Detect and analyze application security vulnerabilities in workloads

### Lab Sections

| Section | Description |
|---------|-------------|
| 3.2 Deploy Operator | Install Dynatrace Operator via Azure Portal |
| 3.3 Deploy App | Deploy the sample application to AKS |
| 3.4 Review App | Explore the modernized application |
| 3.5 Cluster Health | Assess cluster health and performance |
| 3.6 Resource Optimization | Identify underutilized workloads |
| 3.7 Troubleshooting | Use Application Observability and Davis AI |
| 3.8 Security | Detect application security vulnerabilities |
| 3.9 Summary | Review what you accomplished |
