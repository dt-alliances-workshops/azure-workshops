# 01. Setting up your Azure Envrionment

## **🚀 Prerequisites Check**

| Item | Required | Status | Notes |
| :---- | :---- | :---- | :---- |
| Azure Account | Yes | ✅ | Free tier is sufficient. |
| VS Code Installed | Yes | ✅ | With the Remote \- WSL extension. |
| Azure CLI | No | ❌ | We will install this in Step 1\. |

## **Step 1: Install the Azure Command Line Interface (CLI)**

The Azure CLI is a cross-platform command-line tool that allows you to connect to Azure and execute administrative commands on Azure resources.

### **1.1. Execute the Installation Script**

Open your WSL Terminal (or use the Integrated Terminal in VS Code) and run the following command:

\# This command installs the necessary packages for apt  
curl \-sL \[https://aka.ms/InstallAzureCLIDeb\](https://aka.ms/InstallAzureCLIDeb) | sudo bash

**Note:** If you run into permission errors, ensure you have the necessary sudo rights in your WSL environment.

### **1.2. Verify the Installation**

Check that the CLI is installed correctly by requesting the version:

az \--version

You should see version information output in the terminal.

## **Step 2: Log in to Azure**

Now that the CLI is installed, you need to authenticate with your Azure account.

### **2.1. Run the Login Command**

Execute the interactive login command. This will open a browser window for authentication:

az login

### **2.2. Authentication Process**

1. A message will appear in the terminal, asking you to go to a URL (e.g., https://microsoft.com/devicelogin) and enter a unique code.  
2. Follow the instructions in your web browser.  
3. Once authenticated, your terminal will display a JSON output showing all the subscriptions associated with your account.

## **✅ Module Completion**

Congratulations\! You have successfully installed and authenticated the Azure CLI.

The next module will focus on [**02\. Creating an Azure Resource Group**](/docs/workshops/02_create_resource_group.md).