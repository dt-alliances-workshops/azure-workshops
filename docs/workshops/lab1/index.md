--8<-- "snippets/send-bizevent/0-getting-started.js"

# Lab 1: Setting up Environment

## 1.1 Intro

Welcome to the Azure Grail Workshop! In this first lab, you will set up all the foundational components needed to complete the workshop exercises. This includes configuring your Azure subscription, provisioning a Dynatrace environment, and deploying the workshop resources.

By the end of this lab, you will have a fully functional environment with:

- A temporary Azure subscription with pre-allocated credits
- A Dynatrace SaaS tenant connected via Azure Native Dynatrace Service
- An Azure Kubernetes Service (AKS) cluster ready for application deployment
- A sample monolith application running on an Azure VM

### Learning Objectives

🔷 Set up your temporary Azure subscription using the Azure Pass promo code

🔷 Provision a Dynatrace environment through the Azure Marketplace

🔷 Configure the Azure Cloud Shell for running workshop scripts

🔷 Collect environment credentials for automation scripts

🔷 Provision all Azure resources needed for the workshop

🔷 Validate the provisioned resources are working correctly

### Lab Sections

This lab is divided into the following sections:

| Section | Description |
|---------|-------------|
| 1.2 Azure Pass Setup | Set up your temporary Azure subscription |
| 1.3 Create ANDS | Provision Dynatrace from Azure Marketplace |
| 1.4 Azure Portal Prep | Configure Azure Cloud Shell |
| 1.5 Dynatrace Setup | Access Dynatrace UI and create API token |
| 1.6 Collect Inputs | Gather credentials for provisioning scripts |
| 1.7 Provision Workshop | Run the automated provisioning script |
| 1.8 Validate Setup | Verify all resources are working |
| 1.9 Summary | Review what you accomplished |
