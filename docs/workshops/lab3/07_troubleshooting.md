# Lab 3: Azure Kubernetes Observability with Dynatrace

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
