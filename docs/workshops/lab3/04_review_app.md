# Lab 3: Azure Kubernetes Observability with Dynatrace

## 3.4 Review Sample Application on Kubernetes

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
