# Lab 6: Cleanup & Reminder

## 6.2 Workshop "Sandbox"

The workshop "Sandbox" environment will only be available for a few more hours. However, this website will remain accessible even after the sandbox expires. You can return anytime to reference these instructions.  

### Recreating the Workshop Environment

If you have your own Azure subscription and would like to replicate the lab environment, follow these steps:

1. **Deploy the Azure resources** by completing [Lab 1: Setting up Environment](../lab1/index.md), specifically:

    * [1.2 Azure Portal Prep](../lab1/02_portal_prep.md) - Configure Azure Cloud Shell and download scripts
    * [1.4 Collect Inputs](../lab1/04_collect_inputs.md) - Gather credentials for provisioning
    * [1.5 Setup Workshop](../lab1/05_setup_workshop.md) - Run the provisioning script to create Azure resources

2. **Deploy a Dynatrace environment with Azure Native integration** by following these steps:

    1. Navigate to Marketplace via Azure Portal: [Azure Marketplace](https://portal.azure.com/#view/Microsoft_Azure_Marketplace/MarketplaceOffersBlade/selectedMenuItemId/home)

    2. Search for `Azure Native Dynatrace Service` in the search bar.

    3. Select **Azure Native Dynatrace Service** in the search results.

    4. Under the Plan dropdown, select **Dynatrace for Azure Trial** and click **Subscribe**.

    5. On the **Basics** tab, fill out the required fields:

        * **Azure Resource details:**
            * Enter a unique **Resource name**
            * Select a **Region** to deploy your resource
            * Select your **Subscription**
            * Select or create a **Resource group**

    6. Click **Next: Metrics and Logs** and optionally configure:

        * Enable **metrics collection** for platform metrics
        * Enable **Subscription activity logs** to send subscription-level logs to Dynatrace
        * Enable **Azure resource logs** to send resource logs to Dynatrace

    7. Click **Next** and optionally configure **Single sign-on** if your organization uses Microsoft Entra ID.

    8. Click **Next** and optionally add **Tags** for your resource.

    9. Click **Review + create**, verify there are no errors, then click **Create**.

    10. Once the resource is deployed, click on the Dynatrace Azure resource in Azure Portal, go to the **Overview** blade, and click **Go to Dynatrace**.
