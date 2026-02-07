# Lab 3: Azure Kubernetes Observability with Dynatrace

## 3.3 Deploy Sample Applications

In this step, we'll deploy three sample applications to the Azure Kubernetes cluster. These applications represent different architectures and use cases that you'll explore throughout the workshop.

### Applications Overview

| Application | Namespace | Description |
|-------------|-----------|-------------|
| **Hipster Shop** | `hipster-shop` | Google's microservices demo - an e-commerce app with 10+ services |
| **DT Orders** | `staging` | Dynatrace demo app - modernized microservices architecture |
| **Travel Advisor** | `travel-advisor-azure-openai-sample` | AI-powered travel app using Azure OpenAI |

### Tasks to complete this step

#### Step 1: Deploy the Applications

1. In the **Azure Cloud Shell**, navigate to the app-scripts folder and run the deployment script:

    ```bash
    cd ~/azure-modernization-dt-orders-setup/app-scripts
    ./deploy-k8-apps.sh
    ```

2. The script will deploy all three applications. You'll see output similar to:

    ```
    ==========================================================
    Configuring AKS cluster credentials...
    ==========================================================
    Resource Group: dynatrace-azure-workshop
    AKS Cluster:    dynatrace-azure-workshop-cluster
    Connected to AKS cluster successfully.

    ==========================================================
    Deploying App #1 - Hipster Shop
    ==========================================================
    Hipster Shop deployment initiated.

    ==========================================================
    Deploying App #2 - DT Orders
    ==========================================================
    DT Orders deployment initiated.

    ==========================================================
    Deploying App #3 - Travel Advisor (Azure OpenAI)
    ==========================================================
    Travel Advisor deployment initiated.
    ```

#### Step 2: Verify Pod Status

Wait a few minutes for the pods to start, then verify all pods are running:

1. Check **Hipster Shop** pods:

    ```bash
    kubectl -n hipster-shop get pods
    ```

    Expected output (11 pods):

    ```
    NAME                                     READY   STATUS    RESTARTS   AGE
    adservice-xxxxx                          1/1     Running   0          2m
    cartservice-xxxxx                        1/1     Running   0          2m
    checkoutservice-xxxxx                    1/1     Running   0          2m
    currencyservice-xxxxx                    1/1     Running   0          2m
    emailservice-xxxxx                       1/1     Running   0          2m
    frontend-xxxxx                           1/1     Running   0          2m
    loadgenerator-xxxxx                      1/1     Running   0          2m
    paymentservice-xxxxx                     1/1     Running   0          2m
    productcatalogservice-xxxxx              1/1     Running   0          2m
    recommendationservice-xxxxx              1/1     Running   0          2m
    shippingservice-xxxxx                    1/1     Running   0          2m
    ```

2. Check **DT Orders** pods:

    ```bash
    kubectl -n staging get pods
    ```

    Expected output (6 pods):

    ```
    NAME                               READY   STATUS    RESTARTS   AGE
    browser-traffic-xxxxx              1/1     Running   0          2m
    catalog-xxxxx                      1/1     Running   0          2m
    customer-xxxxx                     1/1     Running   0          2m
    frontend-xxxxx                     1/1     Running   0          2m
    load-traffic-xxxxx                 1/1     Running   0          2m
    order-xxxxx                        1/1     Running   0          2m
    ```

3. Check **Travel Advisor** pods:

    ```bash
    kubectl -n travel-advisor-azure-openai-sample get pods
    ```

    Expected output:

    ```
    NAME                              READY   STATUS    RESTARTS   AGE
    travel-advisor-xxxxx              1/1     Running   0          2m
    ```

!!! warning "Pod Startup Time"
    It may take 3-5 minutes for all pods to reach `Running` status. If some pods show `ContainerCreating` or `Pending`, wait and re-run the kubectl commands.

!!! success "Checkpoint"
    Before proceeding, verify:

    - All Hipster Shop pods (11) are in `Running` status
    - All DT Orders pods (6) are in `Running` status
    - Travel Advisor pod is in `Running` status

??? info "About the Sample Applications"

    **Hipster Shop** is Google's microservices demo application. It simulates an e-commerce platform with services for:

    - Product catalog and recommendations
    - Shopping cart and checkout
    - Payment and shipping
    - Email notifications
    - Currency conversion
    - Ad serving

    **DT Orders** is a Dynatrace demo application that showcases:

    - Frontend web interface
    - Catalog, customer, and order services
    - Simulated browser and load traffic

    **Travel Advisor** is an AI-powered application that uses:

    - Azure OpenAI for intelligent travel recommendations
    - This app will be used in Lab 5 for AI Observability
