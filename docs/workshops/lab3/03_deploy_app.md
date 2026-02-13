# Lab 3: Azure Kubernetes Observability with Dynatrace

## 3.3 Deploy Sample Applications

In this step, we'll deploy two sample applications to the Azure Kubernetes cluster. These applications represent different architectures and use cases that you'll explore throughout the workshop.

### Applications Overview

| Application | Namespace | Description |
|-------------|-----------|-------------|
| **EasyTrade** | `easytrade` | A financial trading platform demo with multiple microservices |
| **Travel Advisor** | `travel-advisor-azure-openai-sample` | AI-powered travel app using Azure OpenAI |

### Tasks to complete this step

#### Step 1: Deploy the Applications

1. In the **Azure Cloud Shell**, navigate to the app-scripts folder and run the deployment script:

    ```bash
    cd ~/azure-modernization-dt-orders-setup/app-scripts
    ./deploy-k8-apps.sh
    ```

2. The script will deploy both applications. You'll see output similar to:

    ```
    ==========================================================
    Deploying Workshop K8s Applications
    ==========================================================
      Resource Group: dynatrace-azure-workshop
      AKS Cluster:    dynatrace-azure-workshop-cluster

    Applications to deploy:
      1. EasyTrade
      2. Travel Advisor

    Configuring AKS cluster credentials...
      Connected successfully.

    ==========================================================
    Deploying App #1 - EasyTrade
    ==========================================================
    Creating namespace 'easytrade'...
    namespace/easytrade created
    Deploying EasyTrade using kustomization...
    ...
      Done.

    ==========================================================
    Deploying App #2 - Travel Advisor
    ==========================================================
    namespace/travel-advisor-azure-openai-sample created
    ...
      Done.

    ==========================================================
    Deployment Complete!
    ==========================================================
    ```

#### Step 2: Verify Pod Status

Wait a few minutes for the pods to start, then verify all pods are running:

1. Check **EasyTrade** pods:

    ```bash
    kubectl -n easytrade get pods
    ```

    Expected output (19 pods):

    ```
    NAME                                         READY   STATUS    RESTARTS   AGE
    accountservice-xxxxx                         1/1     Running   0          2m
    aggregator-service-xxxxx                     1/1     Running   0          2m
    broker-service-xxxxx                         1/1     Running   0          2m
    calculationservice-xxxxx                     1/1     Running   0          2m
    contentcreator-xxxxx                         1/1     Running   0          2m
    credit-card-order-service-xxxxx              1/1     Running   0          2m
    db-xxxxx                                     1/1     Running   0          2m
    engine-xxxxx                                 1/1     Running   0          2m
    feature-flag-service-xxxxx                   1/1     Running   0          2m
    frontend-xxxxx                               1/1     Running   0          2m
    frontendreverseproxy-xxxxx                   1/1     Running   0          2m
    loadgen-xxxxx                                1/1     Running   0          2m
    loginservice-xxxxx                           1/1     Running   0          2m
    manager-xxxxx                                1/1     Running   0          2m
    offerservice-xxxxx                           1/1     Running   0          2m
    pricing-service-xxxxx                        1/1     Running   0          2m
    problem-operator-xxxxx                       1/1     Running   0          2m
    rabbitmq-xxxxx                               1/1     Running   0          2m
    third-party-service-xxxxx                    1/1     Running   0          2m
    ```

2. Check **Travel Advisor** pods:

    ```bash
    kubectl -n travel-advisor-azure-openai-sample get pods
    ```

    Expected output (2 pods):

    ```
    NAME                                       READY   STATUS    RESTARTS   AGE
    loadgen-deployment-xxxxx                   1/1     Running   0          2m
    traveladvisor-deployment-xxxxx             1/1     Running   0          2m
    ```

!!! warning "Pod Startup Time"
    EasyTrade has many services and may take several minutes for all pods to reach `Running` status. If some pods show `ContainerCreating` or `Pending`, wait and re-run the kubectl commands.

#### Step 3: Access the Sample Applications (Optional)

1. Get the external IP for the **EasyTrade** frontend:

    ```bash
    kubectl -n easytrade get svc frontendreverseproxy-easytrade
    ```

2. Get the external IP for the **Travel Advisor** app:

    ```bash
    kubectl -n travel-advisor-azure-openai-sample get svc traveladvisor-service
    ```

!!! tip "Accessing the Applications"
    Copy the `EXTERNAL-IP` from the kubectl output and paste it into your browser to access the application. For example:

    - EasyTrade: `http://<EXTERNAL-IP>`
    - Travel Advisor: `http://<EXTERNAL-IP>`

    Note: It may take a few minutes for the external IP to be assigned. If you see `<pending>`, wait and re-run the command.

    **EasyTrade Login:** When you reach the EasyTrade login screen, click **"Login as James"** on the right side of the page to quickly access the application without creating an account.

!!! success "Checkpoint"
    Before proceeding, verify:

    - All EasyTrade pods (19) are in `Running` status
    - Both Travel Advisor pods are in `Running` status
    - Both apps are accessible via browser at their external IP addresses. 

??? info "About the Sample Applications"

    **EasyTrade** is a financial trading platform demo that showcases:

    - **Account & Login Services** — User authentication and account management
    - **Broker & Pricing Services** — Trading operations and real-time pricing
    - **Offer Service** — Investment recommendations
    - **Content Creator** — Market insights generation
    - **Feature Flag Service** — Dynamic feature toggling
    - **Problem Operator** — Simulated issues for troubleshooting exercises
    - **Load Generator** — Synthetic traffic for realistic monitoring data

    **Travel Advisor** is an AI-powered application that uses:

    - Azure OpenAI for intelligent travel recommendations
    - Load generator for continuous AI request traffic
    - This app will be used in Lab 5 for AI Observability
