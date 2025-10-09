# 02. Creating an Azure Resource Group

Every resource in Azure must belong to a **Resource Group (RG)**. The RG acts as a logical container that holds related resources for an Azure solution.

## **Step 1: Choose Resource Group Name and Location**

We recommend using a clear naming convention for all workshop resources.

### **1.1 Define Variables**

In your WSL terminal, define variables for reuse. Replace \[YOUR-INITIALS\] with your actual initials.

RESOURCE\_GROUP\_NAME="rg-workshop-\[YOUR-INITIALS\]"  
LOCATION="eastus" \# Using East US as a standard region

## **Step 2: Execute the Creation Command**

Use the az group create command to provision the Resource Group.

az group create \--name $RESOURCE\_GROUP\_NAME \--location $LOCATION

You will see a JSON output confirming the creation, including the provisioning state.

## **Step 3: Verify the Creation**

Check that the Resource Group is listed in your Azure subscription:

az group list \--output table

Confirm that the $RESOURCE\_GROUP\_NAME is present in the table output.

## **✅ Module Completion**

You have successfully created the container for all future resources.

Next, we will deploy a simple web application in [**03\. Deploying a Basic Web App**](docs/workshops/03_deploy_web_app.md).