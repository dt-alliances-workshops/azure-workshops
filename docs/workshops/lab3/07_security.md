# Lab 3: Azure Kubernetes Observability with Dynatrace

## 3.7 Detect Application Security Vulnerabilities in Workloads

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

!!! success "Checkpoint"
    Before proceeding to the next section, verify:

    - You viewed vulnerabilities associated with the cluster
    - You filtered to find critical vulnerabilities
    - You reviewed vulnerability details including risk assessment and remediation guidance
