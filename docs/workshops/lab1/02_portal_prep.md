# Lab 1: Setting up Environment

## 1.2 Azure Portal Prep

In this section, you will configure the Azure Cloud Shell and download the workshop scripts. The Cloud Shell provides a browser-based command-line interface for managing Azure resources.

### Tasks to complete this step

1.  Navigate to <a href="https://portal.azure.com/" target="_blank">https://portal.azure.com/ </a>

1.  Click on the Cloud Shell button
    ![image](img/setup-azure-shell-open.png)

    !!! tip "Bash Shell"
        🧮If you get this prompt, choose bash.

    ![image](img/setup-azure-shell-bash.png)

    !!! tip "Azure Pass"
        🧮If you get the prompt below, choose `Azure Pass - Sponsorship` and then click the `Create Storage` button.


    ![image](img/setup-azure-shell-storage.png)


    ??? info "Storage Account"
        Creating the storage will take a couple of minutes.

1.  Once the storage is created, you should see the Unix bash shell.
    ![image](img/setup-azure-shell-prompt.png)

1.  Make a dedicated Azure shell Browser tab by clicking this new tab icon.
    ![image](img/setup-azure-shell-newtab.png)

??? info "Verifying and Changing Your Azure Subscription"
    To verify which subscription is configured for the Azure CLI, run this command:

    ```console
    az account show
    ```

    Look for the `name` field in the output. This is an example when a promo code was used:

    ```json
    {
      "environmentName": "AzureCloud",
      "homeTenantId": "xxx-xxx-xxx-xx-xxx",
      "id": "yyy-yyyy-yyy-yyy-yyy",
      "isDefault": true,
      "managedByTenants": [],
      "name": "Azure Pass - Sponsorship",   <----- This is the active subscription
      "state": "Enabled",
      "tenantId": "zzz-zzz-zzz-zzz-zzz",
      "user": {
        "name": "name@company.com",
        "type": "user"
      }
    }
    ```

    **If the subscription is not correct**, run this command to see all subscriptions for your user:

    ```
    az account list --output table
    ```

    Sample output:

    ```
    Name                                     CloudName    SubscriptionId                        State    IsDefault
    ---------------------------------------  -----------  ------------------------------------  -------  -----------
    Subscription 1                           AzureCloud   aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa  Enabled  False
    Subscription 2                           AzureCloud   bbbbbbbb-aaaa-aaaa-aaaa-aaaaaaaaaaaa  Enabled  False
    Azure Pass - Sponsorship                 AzureCloud   eeeeeeee-aaaa-aaaa-aaaa-aaaaaaaaaaaa  Enabled  True
    ```

    **To change your default subscription**, run these commands:

    ```bash
    # set the subscription
    az account set --subscription <YOUR SUBSCRIPTION ID>

    # verify change
    az account list --output table

    # double check with
    az account show
    ```

1. Within your Azure Cloud Shell window, run this command to download the workshop scripts:
    ```
      git clone https://github.com/dt-alliances-workshops/azure-modernization-dt-orders-setup.git
    ```
1. To validate all the workshops scripts have download, please run these commands within the Azure Cloud Shell window to display the directories
    ```
      cd azure-modernization-dt-orders-setup/
      ls -al
    ```
    1.  You should see an output similar to the one below
        ![image](img/pre-requisites-azure-cli-gitcloneoutput.png)

!!! success "Checkpoint"
    Before proceeding to the next section, verify:

    - Azure Cloud Shell is open and working
    - You are using the correct Azure subscription
    - The workshop repository has been cloned successfully
    - You can see the `provision-scripts` and `app-scripts` directories
