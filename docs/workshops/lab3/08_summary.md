# Lab 3: Azure Kubernetes Observability with Dynatrace

## 3.8 Summary

While migrating to the cloud, you want to evaluate if your migration goes according to plan, whether services are performing well or even better than before, and whether your new architecture is as efficient as the blueprint suggested. Dynatrace helps you validate all these steps automatically, speeding up the migration and validation process.

### What You Accomplished

In this lab, you completed the following:

| Section | Accomplishment |
|---------|----------------|
| **3.2 Deploy Operator** | Installed the Dynatrace Operator on AKS via Azure Portal with one-click activation |
| **3.3 Deploy App** | Deployed the EasyTrade (19 microservices) and Travel Advisor (AI-powered) sample applications |
| **3.4 Cluster Health** | Used the Kubernetes app to assess cluster health, identify unhealthy workloads, and review events |
| **3.5 Resource Optimization** | Identified underutilized workloads and used DQL in Notebooks to find missing resource requests/limits |
| **3.6 Troubleshooting** | Troubleshot workload issues using Application Observability and Dynatrace Intelligence for automatic root cause analysis |
| **3.7 Security** | Detected vulnerabilities and used Davis Security Score (DSS) to prioritize remediation based on real runtime context |

### Key Takeaways

- **Unified Kubernetes Observability** — The Kubernetes app provides a single pane of glass for cluster health, workloads, nodes, and events across all your Kubernetes environments
- **Automatic Root Cause Analysis** — Dynatrace Intelligence uses topology, transaction, and code-level information to pinpoint root causes automatically—using causation, not correlation
- **Context-Aware Security** — Davis Security Score enhances CVSS by considering public internet exposure, data asset reachability, and whether vulnerable code is actually executed in production
- **Resource Optimization** — DQL queries in Notebooks help identify workloads missing CPU/memory requests or limits, enabling right-sizing and cost optimization

### What's Next?

In **Lab 4**, you will learn how to create Dashboards and Notebooks in Dynatrace to visualize, analyze, and share observability data using the Dynatrace Query Language (DQL).
