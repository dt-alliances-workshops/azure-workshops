# Lab 1: Setting up Environment

## 1.5 Setup Workshop Resources

In this section, you will run the setup script to verify and configure the Azure resources needed for the workshop.

!!! info "Pre-Provisioned Environment"
    The workshop resources may already be created for you. The script will first check if the resources exist. If they do, it will verify they are running correctly and skip to configuration. If resources are not found, the script will prompt you for inputs to create them.

!!! info "Script Location"
    The script is located in the repository you cloned in Step 1.2. Make sure you're in the Azure Cloud Shell and have navigated to the `provision-scripts` directory.

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

    - **If resources exist:** The script will verify they are running correctly and skip to configuration. You can proceed to step 6.
    - **If resources do not exist:** The script will prompt you for the following inputs to create them:

    | Input | Description | Action |
    |-------|-------------|--------|
    | **Azure Subscription ID** | Your subscription ID | Press Enter to accept the current value |
    | **Resource Group Name** | Name for the resource group | Press Enter to accept default: `dynatrace-azure-workshop` |
    | **Azure Location** | Azure region for resources | Press Enter to accept default: `eastus` |

4. (Only if creating resources) Review the configuration summary and confirm by entering `y`:

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

5. (Only if creating resources) Wait for the script to complete. The provisioning process will:
    - Register required Azure resource providers
    - Create the resource group
    - Create and configure the virtual machine
    - Create the AKS cluster (this step takes several minutes)
    - Create the AI Foundry resources

    !!! warning "Provisioning Time"
        The full provisioning process takes approximately **15-20 minutes**. The AKS cluster creation is the longest step. Do not close your Cloud Shell session during this time.

6. When the script completes successfully, you should see output similar to:

    ```
    ===========================================================================
    ✓ Provisioning Complete!
    ===========================================================================

    Resources created:
      - Resource Group: dynatrace-azure-workshop
      - Virtual Machine: dt-orders-monolith (IP: xx.xx.xx.xx)
      - AKS Cluster: dynatrace-azure-workshop-cluster
      - AI Foundry: dynatrace-azure-workshop-aifoundry
    ```

!!! success "Checkpoint"
    Before proceeding to the next step, ensure:

    - The script completed without errors
    - All resources show as successfully created
    - You noted the VM public IP address (you'll need this later)
