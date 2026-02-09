# Lab 1: Setting up Environment

## 1.5 Setup Workshop Resources

In this section, you will run the setup script to verify and configure the Azure resources needed for the workshop.

!!! info "Pre-Provisioned Environment"
    The workshop resources may already be created for you. The script will first check if the resources exist. If they do, it will skip provisioning and proceed directly to configuration. If resources are not found, the script will prompt you for inputs to create them.

### Workshop Resources

The following Azure resources are required for this workshop:

| Resource | Name | Description |
|----------|------|-------------|
| Resource Group | `dynatrace-azure-workshop` | Container for all workshop resources |
| Virtual Machine | `dt-orders-monolith` | Ubuntu VM running the sample monolith application |
| AKS Cluster | `dynatrace-azure-workshop-cluster` | Kubernetes cluster for microservices deployment |
| AI Foundry | `dynatrace-azure-workshop-aifoundry` | Azure AI services for Lab 5 |

### Tasks to complete this step

1. In your Azure Cloud Shell, navigate to the provision scripts directory:

    ```bash
    cd ~/azure-modernization-dt-orders-setup/provision-scripts
    ```

2. Run the workshop setup script:

    ```bash
    ./setup-azure-workshop.sh
    ```

3. The script will check if the workshop resources already exist:

    ```
    ===========================================================================
    Checking for Existing Workshop Resources
    ===========================================================================

    Using default resource names:
      Resource Group: dynatrace-azure-workshop
      VM:             dt-orders-monolith
      AKS Cluster:    dynatrace-azure-workshop-cluster
      AI Foundry:     dynatrace-azure-workshop-aifoundry
    ```

    Based on the results, you'll see one of two scenarios:

    === "Resources Already Exist"

        If all resources are found, you'll see:

        ```
        Resource Group [dynatrace-azure-workshop]: ✓ EXISTS
        Virtual Machine [dt-orders-monolith]: ✓ EXISTS
        AKS Cluster [dynatrace-azure-workshop-cluster]: ✓ EXISTS
        AI Foundry [dynatrace-azure-workshop-aifoundry]: ✓ EXISTS

        ===========================================================================
        All Resources Already Exist
        ===========================================================================

        ✓ All Azure resources are already provisioned!

        Proceeding to configure the workshop environment...

        Continue with workshop configuration? (y/n):
        ```

        Enter `y` to continue. The script will proceed to **Workshop Configuration** (Step 4).

    === "Resources Need Provisioning"

        If resources are not found, you'll see:

        ```
        Resource Group [dynatrace-azure-workshop]: ⚠ NOT FOUND

        ===========================================================================
        Resources Need to be Provisioned
        ===========================================================================

        Some or all workshop resources need to be created.
        Please provide the required inputs:
        ```

        **Provide the requested inputs:**

        | Input | Description | Action |
        |-------|-------------|--------|
        | **Azure Subscription ID** | Your subscription ID | Press Enter to accept the current value |
        | **Resource Group Name** | Name for the resource group | Press Enter to accept default: `dynatrace-azure-workshop` |
        | **Azure Location** | Azure region for resources | Press Enter to accept default: `eastus` |

        **Review the configuration summary and confirm by entering `y`:**

        ```
        -------------------------------------------------------------------
        Configuration Summary:
        -------------------------------------------------------------------
          Subscription:      xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
          Resource Group:    dynatrace-azure-workshop
          Location:          eastus
          VM Name:           dt-orders-monolith
          AKS Cluster:       dynatrace-azure-workshop-cluster
          AI Foundry:        dynatrace-azure-workshop-aifoundry
        -------------------------------------------------------------------

        Proceed with provisioning? (y/n): y
        ```

        The script will then create the resources:

        - Step 01: Register required Azure resource providers
        - Step 02: Create Resource Group
        - Step 03: Create Virtual Machine
        - Step 04: Create AKS Cluster (this takes several minutes)
        - Step 05: Create AI Foundry

        !!! warning "Provisioning Time"
            The full provisioning process takes approximately **15-20 minutes**. The AKS cluster creation is the longest step. Do not close your Cloud Shell session during this time.

4. After resources are verified or created, the script will configure the workshop environment:

    ```
    ===========================================================================
    Configuring Workshop Environment
    ===========================================================================

    This will perform the following steps:
      1. Configure VM with workshop repository, Docker, and start monolith app
      2. Save AI Foundry credentials to workshop-credentials.json
      3. Update Travel Advisor manifest with AI Foundry and OTEL credentials
    ```

    Wait for configuration to complete. You'll see status updates for each step.

5. When the script completes successfully, you should see:

    ```
    ===========================================================================
    Workshop Setup Complete!
    ===========================================================================
    ```

!!! success "Checkpoint"
    Before proceeding to the next step, ensure:

    - The script completed without errors
    - All resources show as `✓ READY` or `✓ EXISTS`
    - The VM configuration completed successfully
