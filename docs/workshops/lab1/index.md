--8<-- "snippets/send-bizevent/0-getting-started.js"

# Lab 1: Setting up Environment

## 1.1 Intro

Welcome to the Azure Grail Workshop! In this first lab, you will set up all the foundational components needed to complete the workshop exercises. This includes configuring your Azure environment, provisioning a Dynatrace environment, and deploying the workshop resources.

By the end of this lab, you will have a fully functional environment with:

- A Dynatrace SaaS tenant connected via Azure Native Dynatrace Service (ANDS)
- An Azure Kubernetes Service (AKS) cluster ready for application deployment
- A sample monolith application running on an Azure VM
- Azure AI Foundry resources for AI Observability labs

### Learning Objectives

🔷 Configure the Azure Cloud Shell for running workshop scripts

🔷 Access your Dynatrace environment and navigate the new Grail UI

🔷 Create an API token for automation scripts

🔷 Collect environment credentials for provisioning

🔷 Provision all Azure resources needed for the workshop

🔷 Validate the provisioned resources are working correctly

### Lab Sections

This lab is divided into the following sections:

| Section | Description |
|---------|-------------|
| 1.2 Azure Portal Prep | Configure Azure Cloud Shell and download scripts |
| 1.3 Dynatrace Setup | Access Dynatrace UI and create API token |
| 1.4 Collect Inputs | Gather credentials for provisioning |
| 1.5 Setup Workshop | Run the provisioning script to create Azure resources |
| 1.6 Validate Setup | Verify all resources are working |
| 1.7 Summary | Review what you accomplished |
