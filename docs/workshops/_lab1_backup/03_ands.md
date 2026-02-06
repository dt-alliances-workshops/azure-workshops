# Lab 1: Setting up Environment

## 1.3 Create Azure Native Dynatrace Service from Marketplace

For this workshop, we will set-up a free Dynatrace Azure SaaS tenant with an temporary license complete with all the features of our all-in-one performance monitoring platform to monitor Azure resources and complete the workshop exercises.

### Tasks to complete this step

1. Open up browser and go to Azure Portal - <a href="https://portal.azure.com/" target="_blank">https://portal.azure.com/ </a>
    1.  Search for Marketplace from the top search bar
        ![image](img/az-marketplace.png)
    1.  Once in the Azure Marketplace, search for `Azure Native Dynatrace Service` click on tile when the search displays the results.
        ![image](img/ands.png)
    1.  From the drop-down under plan, select `Dynatrace for Azure Trial` and click on subscribe
        ![image](img/ands-subscribe.png)
    1.  Click on "Create" a new Dynatrace environment
        ![image](img/ands-create.png)
    1.  On the create Dynatrace environment screen (Basic's)
        1.  Select the `Azure Pass - Sponsorship` subscription
        1.  create a new resource group called `azure-native-dynatrace`
        1.  fill in the resource name as `dt-trial`
        1.  The rest of the settings can take the defaults
        1.  Click on "Review + Create" button
            ![image](img/ands-create-basics-1.png)
        1.  On the next screen click on "Create" button
            ![image](img/Lab0-Step4-ands-validate.png)
        1.  It will take 3-5 minutes for the deployment to complete.  Once the deployment comples successfully, your screen should reflect as below.  Click on `Go to resource` button
            ![image](img/ands-create-complete.png)
