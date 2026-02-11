# Lab 2: Monitor Azure Cloud Resources

## 2.4 Cloud Resource Analysis with DQL

!!! success "Return to Your Own Environment"
    **You should now return to your own Dynatrace environment** for this section and the remaining labs. The shared environment was only needed for section 2.3 to access the Clouds App private preview.

    **Your Environment URL:** Use the Dynatrace environment URL you were provided at the start of the workshop.

Dynatrace Query Language (DQL) provides a powerful way to analyze logs, metrics, and entity data from your Azure cloud resources. With Azure Native Dynatrace Service, telemetry from your Azure resources is automatically streamed to Dynatrace, where it's indexed and available for analysis in Notebooks.

### Tasks to complete this step

1. Query logs and metrics in a Notebook
    - From the left menu, select `Apps -> Notebooks`
    - Create a new notebook by clicking `+ Notebook`
    - Add three sections with the following queries:

    === "Section 1: Log Sources"

        Add a new section and run this DQL query to see what log sources are being ingested:

        ```dql title="Explore Log Sources"
        fetch logs
        | summarize log_count = count(), by: {log.source}
        | sort log_count desc
        ```

        This shows all log sources and their volume — useful for understanding what telemetry is flowing into Dynatrace.

    === "Section 2: Log Volume"

        Add another section and run this query to visualize log ingestion patterns:

        ```dql title="Log Volume Over Time"
        fetch logs
        | makeTimeseries log_count = count(), interval: 5m
        ```

        This creates a time series chart showing log volume over time.

    === "Section 3: CPU Metrics"

        Add a third section to compare with host CPU metrics:

        ```dql title="CPU Metrics Over Time"
        timeseries cpu = avg(dt.host.cpu.usage), by: {dt.entity.host}
        | fieldsAdd host_name = entityName(dt.entity.host)
        | filter contains(host_name, "monolith")
        ```

        Compare this chart with the log volume chart to identify correlations.

    !!! tip
        **SRE Best Practice:** By viewing logs and metrics side-by-side in a notebook, you can visually correlate patterns. For example, a spike in log volume might coincide with increased CPU usage during a deployment or incident.

    ??? info
        ℹ️ DQL (Dynatrace Query Language) is the native query language for Grail. It allows you to query logs, metrics, and events using a unified syntax. Learn more in the <a href="https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language" target="_blank">DQL Documentation</a>.

1. **Optional: Cloud Governance Queries for SRE/CloudOps**

    These additional DQL queries demonstrate how Dynatrace can support governance and cost optimization use cases.

    === "Resource Inventory"

        List all Azure VMs with their tags and resource groups:

        ```dql title="List all Azure VMs"
        fetch dt.entity.azure_vm
        | fields entity.name, tags, azureResourceGroupName
        | sort entity.name
        ```

        Use this to get a complete inventory of Azure VMs and their associated tags and resource groups.

    === "Tag Compliance"

        Find resources missing required tags:

        ```dql title="Find VMs missing Owner tag"
        fetch dt.entity.azure_vm
        | fields entity.name, tags
        | filter NOT contains(toString(tags), "Owner")
        ```

        This query identifies VMs that are missing the "Owner" tag — useful for enforcing tagging policies and governance.

    === "Cost Optimization"

        Find hosts with low CPU utilization:

        ```dql title="Find underutilized hosts"
        timeseries cpuUsage = avg(dt.host.cpu.usage), by:{dt.entity.host}
        | lookup [
            fetch dt.entity.host
            | fieldsAdd regionId = belongs_to[dt.entity.azure_region]
            | fields id, entity.name, cloudType, logicalCpuCores, physicalMemory, regionId
          ], sourceField:dt.entity.host, lookupField:id, prefix:"host."
        | filter host.cloudType == "AZURE"
        | filter arrayMax(cpuUsage) <= 30
        | lookup [
            fetch dt.entity.azure_vm
            | fieldsAdd hostId = runs[dt.entity.host]
            | fieldsAdd parts = splitString(azureResourceId, "/")
            | fieldsAdd subscriptionId = parts[2]
            | fieldsAdd resourceGroup = parts[4]
            | fields id, subscriptionId, resourceGroup, hostId
          ], sourceField:dt.entity.host, lookupField:hostId, prefix:"vm."
        | lookup [
            fetch dt.entity.azure_region
            | fields id, entity.name
          ], sourceField:host.regionId, lookupField:id, prefix:"region."
        | fieldsAdd vmSizeCategory = if(host.logicalCpuCores <= 2, "small (1-2 vCPU)",
            else: if(host.logicalCpuCores <= 4, "medium (3-4 vCPU)",
            else: if(host.logicalCpuCores <= 8, "large (5-8 vCPU)",
            else: "xlarge (8+ vCPU)")))
        | summarize count = count(), by:{vmSizeCategory, vm.subscriptionId, vm.resourceGroup, region.entity.name}
        | sort count desc
        ```

        Identifies potentially underutilized hosts that could be candidates for rightsizing or decommissioning.

    !!! tip
        **CloudOps Best Practice:** Run these governance queries regularly or build dashboards to track compliance and resource utilization over time. This helps identify cost savings opportunities and ensures adherence to organizational policies.

!!! success "Checkpoint"
    Before proceeding to the next section, verify:

    - You created a Notebook with DQL queries for logs and metrics
    - You can run DQL queries and visualize the results
    - You understand how to query Azure resource entities with DQL
