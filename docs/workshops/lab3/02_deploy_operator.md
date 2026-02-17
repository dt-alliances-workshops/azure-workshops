# Lab 3: Azure Kubernetes Observability with Dynatrace

## 3.2 Deploy the Dynatrace Kubernetes Operator via Azure Portal

### How Dynatrace Monitors Kubernetes

Dynatrace provides full-stack observability for Kubernetes environments by automatically discovering and monitoring all layers—from cluster infrastructure to application code. This is achieved through the **Dynatrace Operator**, a Kubernetes-native component that manages the deployment and lifecycle of all Dynatrace monitoring components.

#### Dynatrace Operator Components

When you deploy the Dynatrace Operator, the following components are automatically configured:

| Component | Description |
|-----------|-------------|
| **OneAgent** | Deployed as a DaemonSet, collects host metrics from Kubernetes nodes and automatically detects new containers |
| **ActiveGate** | Routes observability data to Dynatrace and monitors the Kubernetes API for cluster-level metrics |
| **CSI Driver** | Provides efficient storage for OneAgent binaries, minimizing network and storage usage across nodes |
| **Webhook** | Validates configurations and injects OneAgent code modules into application Pods automatically |

#### How Full-Stack Monitoring Works

1. **Infrastructure Monitoring** — OneAgent runs on each node and collects host metrics, container metrics, and process information
2. **Automatic Injection** — The webhook uses mutating admission controllers to inject OneAgent code modules into application Pods at deployment time
3. **Kubernetes API Monitoring** — ActiveGate queries the Kubernetes API to collect cluster, namespace, workload, and pod metadata
4. **Data Enrichment** — All telemetry is automatically enriched with Kubernetes context (namespace, deployment, pod name, labels)

The rollout is governed by a **DynaKube** custom resource, which defines the deployment mode, capabilities, and configuration for your environment.

!!! info "Why Cloud-Native Full Stack?"
    This workshop uses **cloud-native full stack** deployment mode, which provides complete observability with minimal resource overhead. OneAgent code modules are injected only into application pods, while a lightweight DaemonSet handles node-level metrics.

### Deploy via Azure Portal

One key Dynatrace advantage is ease of activation via Azure Portal. As Kubernetes adoption continues to grow, it becomes more important than ever to simplify the activation of observability across workloads without sacrificing the deployment automation that Kubernetes provides.

With Azure Native Dynatrace Service, you can install the Dynatrace Operator directly from the Dynatrace resource in Azure Portal—no tokens or manual configuration required.

### Tasks to complete this step

#### Step 1: Install Dynatrace Extension on AKS

1. Open the **Azure Portal** and search for `Dynatrace` in the top search bar

2. Select your **Azure Native Dynatrace Service** resource (e.g., `dt-trial`)

3. From the left navigation menu, scroll down and click on **Azure Kubernetes Services** under the Dynatrace environment config section

4. You will see a list of AKS clusters. Find and select the checkbox next to **dynatrace-azure-workshop-cluster**

    !!! tip
        The cluster should show as "Running" in the Resource Status column and "Not Installed" in the Agent Status column.

5. Click **Install Extension** from the top toolbar

    ![Install Extension](img/lab3_section2_installoperator.png)

6. Wait for the installation to complete. The Agent Status will change to "Installed" once finished.

    !!! warning "Installation Time"
        The extension installation typically takes 2-5 minutes. You can click **Refresh** to check the status.

#### Step 2: Activate the Cluster in Dynatrace

Once the extension is installed, you need to activate the cluster in Dynatrace to start monitoring.

1. Open your **Dynatrace environment** (click "Go to Dynatrace" from Azure Portal or navigate directly)

2. From the left menu, click on **Kubernetes** app

3. At the top of the page, you'll see a banner showing **"Activation pending: 1 of X clusters"** - click on this banner

4. In the activation pending dialog, find **dynatrace-azure-workshop-cluster** and click the **Activate** button next to it

    ![Activate Cluster](img/lab3_section2_activate.png)

5. After activation, return to the **Kubernetes** app. Within a few minutes, you should see your cluster with metrics, nodes, namespaces, and workload data.


    !!! tip
        The New Kubernetes experience provides enhanced visualizations, improved navigation, and additional insights for your Kubernetes workloads.

!!! success "Checkpoint"
    Before proceeding, verify:

    - The Dynatrace extension shows as "Installed" in Azure Portal
    - The cluster is activated in the Dynatrace Kubernetes app
    - You can see cluster nodes and basic metrics in Dynatrace

??? info "Alternative Install Method: Manual Operator Installation"

    If you prefer to install the Dynatrace Operator manually (or if the Azure extension method is unavailable), you can use the following steps:

    **Prerequisites:**

    - You will need the **Dynatrace Operator Token** and **API URL** values saved from Lab 1

    **Manual Installation Steps:**

    1. Open up the Azure Portal and search for the AKS Cluster from the top search bar and select it once it displays under resources

        ![Search AKS](img/lab2-aks-search.png)

    2. Once you're on the AKS cluster, from the left navigation, go to `Settings -> Extensions + Applications`

    3. Click on `Install an extension`

        ![Extensions](img/lab2-aks-dt-extension-install1.png)

    4. Search "Dynatrace" in the search bar. Click on the Dynatrace Operator tile once it's displayed.

        ![Search Dynatrace](img/lab2-aks-dt-extension-install2.png)

    5. Click Create at the next screen

    6. On the `Basics` tab, the subscription and resource group should already be pre-selected. Just select the AKS Cluster from the drop down.

        ![Basics Tab](img/lab2-aks-dt-extension-install3.png)

    7. On the `Dynatrace Operator Configuration` tab, fill in the following values:

        - `AKS extension resource name`: dynatraceazureworkshop
        - `Dynatrace operator token`: token value from notepad saved from Lab 1
        - `Data ingest token`: token value from notepad saved from Lab 1
        - `API URL`: URL value from notepad saved from Lab 1
        - `OneAgent Deployment Type`: cloud native full stack

        ![Operator Config](img/lab2-aks-dt-extension-install4.png)

    8. Click on `Review + Create` and click `Create` on the next screen.

    9. After the deployment is complete, follow Step 2 above to activate the cluster in Dynatrace.

        ![Kubernetes Classic](img/lab2-aks-dt-extension-install5.png)
