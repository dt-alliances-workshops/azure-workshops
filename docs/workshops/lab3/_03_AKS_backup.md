--8<-- "snippets/send-bizevent/3-aks-lab.js"

# Azure Grail Workshop Lab 3 - Modernization with AKS

## 3.1 Intro 

Re-hosting (also referred to as lift and shift) is a common migration use case. Re-architecture and Re-platform are steps that break the traditional architectures and replace individual components with cloud services and microservices.

We just learned how we can get great information on services, processes and user requests using Dynatrace and OneAgent. This helps us now decide what individual features or complete applications based on business benefits we need to migrate and modernize. The idea here is to focus on feature-based business benefit with functional migration. 

### Review - Modernize the Sample App 

As we saw earlier, the sample application is a three-tiered application --> frontend, backend, database.

For our lab, another version of the application exists that breaks out each of these backend services into separate services. By putting these services into Docker images, we gain the ability to deploy the service into modern platforms like Azure Kubernetes and Cloud managed services such as the ones from Azure shown below.

![image](img/lab4-app-architecture.png)

The picture below shows how the components of the sample application interact with Dynatrace. 

![image](img/lab2-setup.png)

**#1 . Sample Application** - Representing a "services" architecture of a frontend and multiple backend services implemented as Docker containers that we will review in this lab.

**#2 . Azure Kubernetes Service (AKS)** -  is hosting the application. The Kubernetes cluster had the Dynatrace OneAgent Operator installed. (see below for more details).  Two AKS nodes make up the Kubernetes cluster. The Dynatrace OneAgent was preinstalled by the OneAgent operator and is sending data to your Dynatrace SaaS environment. (see below for more details)

**#3 . Dynatrace Operator** - Dynatrace OneAgent is container-aware and comes with built-in support for out-of-the-box monitoring of Kubernetes. Dynatrace supports full-stack monitoring for Kubernetes, from the application down to the infrastructure layer.

**#4 . Dynatrace tenant** is where monitoring data is collected and analyzed.

**#5 . Full-Stack Dashboard** - Made possible by the Dynatrace OneAgent that will automatically instrument each running node & pod in AKS.

**#6 . Kubernetes Dashboard** - The Kubernetes page provides an overview of all Kubernetes clusters showing monitoring data like the clusters’ sizing and utilization.

??? info 
    📓 Beyond the Lab, over time, you can imagine that this sample application will be further changed to add in other technologies like Azures serverless and other PaaS services like Azures SQL or Cosmo DB databases and virtual networking Application gateways as shown in the picture below.

    ![image](img/lab4-app-architecture-future.png)

### Objectives of this Lab

🔷 Install the Dynatrace Operator and sample application on AKS

🔷 Review how the sample application went from a simple architecture to multiple microservices

🔷 Use the Kubernetes app to analyze cluster health and troubleshoot unhealthy nodes

🔷 Identify underutilized workloads and optimize resource allocation using DQL

🔷 Troubleshoot workload issues using Application Observability and Davis AI

🔷 Detect and analyze application security vulnerabilities in workloads 


 
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




## 3.3 Deploy sample application


In this step we'll walk through deploying the sample app that is now "modernized" into a microservices based app to the Azure Kubernetes cluster.  

We'll use a shell script to deploy the sample application.  Below you'll learn some details around what that shell script is doing and YAML file parameters that Dynatrace uses to define and configure your application in Kubernetes.

??? info 
    ℹ️ **📓`Shell Script to deploy sample app to Kubernetes`**
     By now you understand the various automation files, lets go ahead and open up the <a href="https://github.com/dt-alliances-workshops/azure-modernization-dt-orders-setup/blob/master/app-scripts/start-k8.sh" target="_blank"> `start-k8.sh` </a> to review what the script did for you:

     This script automates a number of `kubectl` commands for the following:

     1. Create a namespace called `staging` where all these resources will reside
     1. Grant the Kubernetes default service account a viewer role into the `staging` namespace
     1. Create both the `deployment` and `service` Kubernetes objects for each of the sample

     - You can read more details on the Kubernetes installation in the <a href="https://dynatrace.com/support/help/platform-modules/infrastructure-monitoring/container-platform-monitoring/kubernetes-monitoring/leverage-tags-defined-in-kubernetes-deployments" target="_blank"> Dynatrace Documentation </a>




??? info 
    ℹ️**📓 Sample App YAML file for deployment**
    <br>To review what is configured for the sample application, go ahead and click on the link for YAML file: <a href="https://github.com/dt-alliances-workshops/azure-modernization-dt-orders-setup/tree/master/app-scripts/manifests/frontend.yml" target="_blank">frontend.yml</a> 

    Notice the labels and annotations:

         ```
         metadata:
               labels:
               app.kubernetes.io/name: frontend
               app.kubernetes.io/version: "1"
               app.kubernetes.io/component: frontend
               app.kubernetes.io/part-of: dt-orders
               app.kubernetes.io/managed-by: helm
               app.kubernetes.io/created-by: dynatrace-demos
               annotations:
               owner: Team Frontend
               chat-channel: dev-team-frontend 
         ```

      Notice the defined container and version.  These containers are stored in <a href="https://hub.docker.com/u/dtdemos" target="_blank"> DockerHub </a>.

         ```
         spec:
            containers:
            - name: frontend
            image: dtdemos/dt-orders-frontend:1
         ```

      Notice the `DT_CUSTOM_PROPS` environment variable:

         ```
         env:
            - name: DT_CUSTOM_PROP
               value: "project=dt-orders service=frontend"
         ```

      The `DT_CUSTOM_PROPS` is a special Dynatrace feature, that the OneAgent will automatically recognize and make Dynatrace tags for the process. You can read more details in the <a href="https://www.dynatrace.com/support/help/shortlink/process-group-properties#anchor_variables" target="_blank"> Dynatrace Documentation </a>



??? info
    ℹ️**📓 Kubernetes Role Binding**

      In Kubernetes, every pod is associated with a service account which is used to authenticate the pod's requests to the Kubernetes API. If not otherwise specified the pod uses the default service account of its namespace.

      * Every namespace has its own set of service accounts and thus also its own namespace-scoped default service account. The labels of each pod for which the service account has view permissions will be imported into Dynatrace automatically.

      * In order for Dynatrace to read the Kubernetes properties and annotations, you need to grant the Kubernetes default service account a viewer role into the `staging` namespace to enable this. We only have one namespace, but you will need to repeat these steps for all service accounts and namespaces you want to enable for Dynatrace within your environments.

      For the workshop, we already updated the required file with the `staging` namespace. Next you will run the setup script that will apply it to your cluster. Go ahead and open this folder and look at the <a href="https://github.com/dt-alliances-workshops/azure-modernization-dt-orders-setup/blob/master/app-scripts/manifests/dynatrace-oneagent-metadata-viewer.yaml" target="_blank"> dynatrace-oneagent-metadata-viewer.yaml </a> file.  




### Tasks to complete this step
- Deploy the Sample App to Kubernetes
   1. In the Azure Cloud Shell, run these commands:
      ```
      cd ~/azure-modernization-dt-orders-setup/app-scripts
      ./start-k8.sh
      ```
   2. The Kubernetes pods take a few minutes to start running. Rerun this command until all the pods are in `Running` status.
      ```
      kubectl -n staging get pods
      ```

      The output should look like this:

      ```
      NAME                               READY   STATUS    RESTARTS   AGE
      browser-traffic-5b9456875d-ks9vw   1/1     Running   0          30h
      catalog-7dcf64cc99-hfrpg           1/1     Running   0          2d8h
      customer-8464884799-vljdx          1/1     Running   0          2d8h
      frontend-7c466b9d69-9ql2g          1/1     Running   0          2d8h
      load-traffic-6886649ddf-76pqf      1/1     Running   0          2d8h
      order-6d4cd477cb-9bvn4             1/1     Running   0          2d8h
      ```

## 3.4 Review Sample application on Kubernetes


In this step we will review the Sample app that we modernized and deployed to Kubernetes.  Refer to this picture for a more detailed description of our setup. 

![image](img/lab2-k8s-namespaces.png)

**1 - Dynatrace Namespace**

This <a href="https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/" target="_blank"> Kubernetes Namespace </a> contains the pods and services that make up the Dynatrace Operator.

**2 - Kubernetes nodes**

Kubernetes runs your workload by placing containers into Pods to run on <a href="https://kubernetes.io/docs/concepts/architecture/nodes/" target="_blank">Nodes</a>.

**3 - Dynatrace**

Dynatrace tenant where monitoring data is collected and analyzed.

**4 - Cloud shell**

The shell is configured with the <a href="https://kubernetes.io/docs/reference/kubectl/overview/" target="_blank"> kubectl </a> command line tool that lets you control Kubernetes clusters.

**5 - Sample application namespace**

This <a href="https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/" target="_blank"> Kubernetes Namespace </a> contains the sample application pods and services.

**6 - Sample application**

The frontend service is exposed as a public IP and is accessible in a browser.

### Tasks to complete this step
1. Validate Sample App is accessible via browser
   - To view the application, we need to get the IP address assigned to the Kubernetes service for the sample application. 
      1. Go back to the window where you have Azure Cloud shell open
      2. From the Azure Cloud Shell SSH command prompt type this command
         ```
         kubectl -n staging get svc
         ```
      3. From the output, copy the entire value from EXTERNAL-IP and 
         ![image](img/lab4-app-ip.png) 
      4. Open a browser window. Type in IP address similar to this `http://11.22.33.11` for the example above.  The output and application should look like the above browser window

2. Explore the Sample App on Kubernetes
      - Use the menu on on the home page to navigate around the application and notice the URL for key functionality. You will see these URLs later as we analyze the application.

            * Customer List = customer/list.html
            * Customer Detail = customer/5.html
            * Catalog List = catalog/list.html
            * Catalog Search Form = catalog/searchForm.html
            * Order List = order/list.html
            * Order Form = order/form.html

    ??? info 
        ℹ️ 📓 The application looks like this monolith, but notice how the home page shows the versions of the three running backend services. You will see these version updated automatically as we deploy new versions of the backend services.
         
         

## 3.5 Assess Cluster Health & Performance

### Overview

In this step we will walk through the new Kubernetes experience which is optimized for DevOps Platform Engineers and Site Reliability Engineers (SREs), focusing on the health and performance optimization of multicloud Kubernetes environments.

The underlying metrics, events, and logs are all powered by <a href="https://docs.dynatrace.com/docs/platform/grail/dynatrace-grail" target="_blank">Grail</a>, which supports flexible analytics through the <a href="https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language" target="_blank">Dynatrace Query Language</a> in Notebooks, Dashboards, and Workflows.

We will use the Kubernetes app to gain clear insights into cluster health, helping you identify and address issues, and ensuring your clusters are functioning efficiently.

### Tasks to complete this step

1. Bring up the Kubernetes app in Dynatrace by going to left Navigation Menu and select `Apps -> Kubernetes`. Alternatively you should see Kubernetes app also visible under the `Pinned` section
    ![image](img/akslevelup-lab1-k8app.png)

2. Click on Explorer from the top to view all of the AKS clusters this Sandbox environment is currently monitoring
    ![image](img/akslevelup-lab1-k8app-explorer.png)

3. Select the `dtaksworkshop` cluster and let's quickly walk through some of the screens:
    - **Overview** screen shows high level cluster utilization, # of nodes, number of workloads and if any of them have any outstanding problems
    - **Logs** screen shows you types of logs (ERROR, WARN, etc) over the last hour. You can click on `Run Query` to quickly show the last 100 errors and warnings log details
    - **Events** screen will show any K8s events details

4. Now let's focus on one of the problem nodes in our cluster. Select the red number under nodes to quickly filter down your view to assess which of your nodes are unhealthy.
    ![image](img/akslevelup-lab1-k8app-rednodes.png)
    ![image](img/akslevelup-lab1-k8app-rednode-detail.png)

5. You will notice in this view that we also show you any Kubernetes events that contribute to unhealthiness, such as Backoff events from pods.

6. If you click on the problem for the 2nd node, you'll quickly see the details of why this node is unhealthy (CPU saturation)
    ![image](img/akslevelup-lab1-k8app-rednode-problem-detail.png)

7. If we quickly switch over to the events tab you can quickly see all of the Kubernetes events that were triggered on this node (such as Backoff event for pod)
    ![image](img/akslevelup-lab1-k8app-rednode-event-detail.png)

8. We can quickly view other metadata about this node as well, such as what OS, K8s version, Labels, Annotations, etc
    ![image](img/akslevelup-lab1-k8app-rednode-info-detail.png)

## 3.6 Workload Resource Optimization

### Overview

Maximize your cluster resources and reduce costs by identifying and optimizing underutilized workloads. Leverage the Kubernetes app alongside advanced queries in Notebooks, powered by data from Grail, for precise resource allocation suggestions.

### Tasks to complete this step

1. In Kubernetes app, go to the explorer view and then select the `dtaksworkshop` cluster click on `View workloads list`
    ![image](img/akslevelup-lab1-k8app-cluster-workloads.png)

2. Let's apply a couple of filters: one to look at only healthy workloads, second to look at workloads from the `hipstershop` namespace
    ![image](img/akslevelup-lab1-k8app-healthyfilter.gif)

3. Switch over to the Utilization tab and sort by CPU Usage, ascending
    ![image](img/akslevelup-lab1-k8app-cluster-workloadslist.png)

4. You will quickly see that the `checkoutservice` sorts to the top and if you click into it to look at resource utilization details, you'll notice that the service only uses 1 millicore of CPU and 12mb of memory, but actually the CPU and memory limits are much higher
    ![image](img/akslevelup-lab1-k8app-cluster-workloadcheckout.png)

5. Review the utilization charts to verify the consistency of usage patterns over time

6. If you need to identify which workloads lack requests or limits, there's a simple Dynatrace Query Language (DQL) query you can run to identify those:
    - Open the Notebooks app from the left navigation
    - Create a new notebook
    - Add a DQL element and copy/paste the query below

    ```dql title="Find workloads missing CPU/Memory requests"
    fetch dt.entity.cloud_application, from: -30m | fields id, workload.name = entity.name, workload.type = arrayFirst(cloudApplicationDeploymentTypes), cluster.id = clustered_by[dt.entity.kubernetes_cluster], namespace.name = namespaceName
    | lookup [
    fetch dt.entity.kubernetes_cluster, from: -30m | fields id, cluster.name = entity.name, cluster.distribution = kubernetesDistribution, cluster.cluster_id = kubernetesClusterId | limit 20000
    ], sourceField:cluster.id, lookupField:id, fields:{cluster.name}
    | fieldsRemove cluster.id
    | filterOut  namespace.name == "kube-system"
    | lookup [
    timeseries values = sum(dt.kubernetes.container.requests_CPU), by:{dt.entity.cloud_application}, from: -2m, filter: dt.kubernetes.container.type == "app"
    | fieldsAdd requests_CPU = arrayFirst(values)
    | limit 20000
    ], sourceField:id, lookupField:dt.entity.cloud_application, fields:{requests_CPU}
    | lookup [
    timeseries values = sum(dt.kubernetes.container.requests_memory), by:{dt.entity.cloud_application}, from: -2m, filter: dt.kubernetes.container.type == "app"
    | fieldsAdd requests_memory = arrayFirst(values)
    | limit 20000
    ], sourceField:id, lookupField:dt.entity.cloud_application, fields:{requests_memory}
    | filter isNull(requests_CPU) or isNull(requests_memory)
    ```

    ![image](img/akslevelup-lab1-k8app-notebook-limitsdql.gif)

## 3.7 Troubleshoot Workloads with Application Observability

### Overview

Even with a reliable infrastructure, issues can arise, leading to service degradation or, in worst-case scenarios, user-facing errors. The Kubernetes experience offers a suite of tools to visualize and troubleshoot issues, helping to catch problems before they escalate.

Often the monitoring tools in an organization simply don't work in the complex ecosystem of microservices and for technologies like Kubernetes.

Finding the root cause of problems is harder than ever before and the effort required goes beyond what is humanly possible when the application spans cloud providers and data centers and the explosion of interconnected services. There are more possibilities for failures and more hiding spots for problems to sneak into the environment when software is driving more than just the application.

Dynatrace's Hypermodal AI, which combines predictive AI, causal AI, and generative AI, boosts productivity across operations, security, development, and business teams.

In this lab, we will explore problems that exist in our sample app and see how troubleshooting time is significantly reduced by letting AI automatically detect problems and pinpoint the root cause, explaining business impact with no manual configuration.

![image](img/lab2-davis-chart.png)

### Tasks to complete this step

1. In Kubernetes app, go to the explorer view and then select the `dtaksworkshop` cluster click on `View workloads list`
    ![image](img/akslevelup-lab1-k8app-cluster-workloads.png)

2. Let's apply a filter to look at workloads from the `staging` namespace. And let's click on the `order` workload.

3. Once we open up the order, we quickly see that under `Application Observability` there's a Failure rate problem that's identified for that workload. Click on `Go to Services app` link in that view
    ![image](img/akslevelup-lab2-k8app-order-service-workload-error.png)

4. Once we open up the order service, we can quickly see that there are many errors reported for this service over the last hour
    ![image](img/akslevelup-lab2-k8app-order-service.png)

5. Let's quickly walk through Application Observability data in Order Service screen:
    - Show Service Flow
    - Show Smartscape view
    - Show 1 trace and code level hierarchy, errors, method hotspots

6. Let's review the problem card that shows root cause of the issue

## 3.8 Detect Application Security Vulnerabilities in Workloads

### Overview

Due to the widespread increase in the usage of open-source libraries, modern applications usually contain a large number of vulnerabilities. Evaluating hundreds or thousands of open vulnerabilities quickly becomes a daunting task.

- **Dynatrace Runtime Vulnerability Analytics** is designed to pinpoint vulnerabilities that need immediate investigation. It automatically analyzes data access paths and production execution to provide an automatic risk and impact assessment.

- **Dynatrace Runtime Application Protection** leverages code-level insights and transaction analysis to detect and block attacks on your applications automatically and in real time.

### Tasks to complete this step

1. Bring up the Kubernetes app in Dynatrace by going to left Navigation Menu and select `Apps -> Kubernetes`. Alternatively you should see Kubernetes app also visible under the `Pinned` section
    ![image](img/akslevelup-lab1-k8app.png)

2. In Kubernetes app, go to the explorer view and then select the `dtaksworkshop` cluster

3. Once you bring up the cluster overview screen you can quickly view the number of vulnerabilities that are associated with this cluster
    ![image](img/akslevelup-lab2-k8app-cluster-vuln.png)

4. Let's filter the vulnerabilities to see if we can quickly pinpoint one with risk level critical
    ![image](img/akslevelup-lab2-k8app-vulnerability-filter.gif)

5. Let's now click on the critical vulnerability to find out additional details about it
    ![image](img/akslevelup-lab2-vuln-details.png)

6. Review the Vulnerability details, including:
    - **Risk assessment** - Dynatrace automatically assesses risk based on whether the vulnerable code is actually reachable
    - **Affected processes** - Which workloads/processes are running the vulnerable library
    - **Public exploit availability** - Whether known exploits exist in the wild
    - **Remediation guidance** - Recommended actions and patched versions

## Summary

While migrating to the cloud, you want to evaluate if your migration goes according to the plan, whether the services are still performing well or even better than before, and whether your new architecture is as efficient as the blueprint suggested. Dynatrace helps you validate all these steps automatically, which helps speed up the migration and validation process.

In this section, you should have completed the following:

✅ Installed Dynatrace Operator on Azure Kubernetes cluster via Azure Portal

✅ Deployed the modernized sample application to AKS

✅ Reviewed real-time data for the sample application on Kubernetes

✅ Used the Kubernetes app to analyze cluster health and troubleshoot unhealthy nodes

✅ Identified underutilized workloads for resource optimization using DQL

✅ Troubleshot workload issues using Application Observability and Davis AI root cause analysis

✅ Detected and analyzed application security vulnerabilities in workloads



