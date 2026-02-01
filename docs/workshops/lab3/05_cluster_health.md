# Lab 3: Azure Kubernetes Observability with Dynatrace

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
