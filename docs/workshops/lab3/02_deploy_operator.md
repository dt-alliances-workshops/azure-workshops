# Lab 3: Azure Kubernetes Observability with Dynatrace

## 3.2 Deploy the Dynatrace Kubernetes Operator via Azure Portal

!!! tip
    🧮 Before starting this step, please ensure you completed **Section 1.8** in **Lab 1** to verify the AKS cluster is provisioned correctly.


!!! tip
    🧮 In **Section 1.6** of **Lab 1**, you should have saved two values in a notepad session. You will now need to input those values in this step.



One key Dynatrace advantage is ease of activation via Azure Portal. OneAgent technology simplifies deployment across large enterprises and relieves engineers of the burden of instrumenting their applications by hand. As Kubernetes adoption continues to grow, it becomes more important than ever to simplify the activation of observability across workloads without sacrificing the deployment automation that Kubernetes provides. Observability should be as cloud-native as Kubernetes itself.

In our workshop, we will install the Dynatrace Operator that streamlines lifecycle management.  You can read more about it here in this <a href="https://www.dynatrace.com/news/blog/new-dynatrace-operator-elevates-cloud-native-observability-for-kubernetes/" target="_blank"> Dynatrace Blog </a>

Organizations will often customize the Dynatrace Operator installation and you can read more about the options in the <a href="https://docs.dynatrace.com/docs/setup-and-configuration/setup-on-k8s/installation" target="_blank"> Dynatrace Doc</a> but, we are going to use a single command that we can get from the Dynatrace interface to show how easy it is to get started.


### Tasks to complete this step

1. Open up the Azure Portal and search for the AKS Cluster from the top search bar and select it once it displays under resources
      ![image](img/lab2-aks-search.png)

1. Once you're on the AKS cluster, from the left navigation, go to `Settings -> Extensions + Applications`

1. Click on `Install an extension`.
   ![image](img/lab2-aks-dt-extension-install1.png)

1. Search Dynatrace in search bar.  Click on Dynatrace Operator tile once its displayed.
   ![image](img/lab2-aks-dt-extension-install2.png)

1. Click create at the next screen

1. On the `Basics` tab, the subscription and resource group should already be pre-selected. Just select the AKS Cluster from the drop down.
   ![image](img/lab2-aks-dt-extension-install3.png)

1. On the `Dynatrace Operator Configuration` here are the values to fill in
!!! tip
    🧮 Bring up the notepad where you saved the values for Dynatrace Operator & Data Ingest token during the provisioning step of the input-credentials script.

    Both the Dynatrace Operator and Data Ingest token values are the same.

      - `AKS extension resource name`: dynatraceazuregrail
      - `Dynatrace operator token`: token value from notepad saved from earlier step
      - `Data ingest token`: token value from notepad saved from earlier step
      - `API URL`: URL value from notepad saved from earlier step
      - `OneAgent Deployment Type`: cloud native full stack

   ![image](img/lab2-aks-dt-extension-install4.png)

1. Click on `Review + Create` and click `Create` on the next screen.
1. After the deployment is complete, go into Dynatrace -> From the left menu select `Apps` and bring up `Kubernetes Classic` app.
   - Within a couple of minutes, you will cluster and some of the metrics start to show up.
      ![image](img/lab2-aks-dt-extension-install5.png)
