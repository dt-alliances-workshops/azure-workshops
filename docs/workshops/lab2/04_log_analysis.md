# Lab 2: Monitor Azure Cloud Resources

## 2.4 Log Analysis via Clouds App

!!! success "Return to Your Own Environment"
    **You should now return to your own Dynatrace environment** for this section and the remaining labs. The shared environment was only needed for section 2.3 to access the Clouds App private preview.

    **Your Environment URL:** Use the Dynatrace environment URL you were provided at the start of the workshop.

Understanding logs in the context of your cloud resources is essential for effective troubleshooting. The Dynatrace Clouds App provides seamless access to logs directly from any cloud resource, eliminating the need to switch between tools or manually correlate data.

With Azure Native Dynatrace Service, logs from your Azure resources are automatically streamed to Dynatrace, where they're indexed and available for analysis alongside metrics and topology data.

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
        timeseries cpu = avg(dt.host.cpu.usage), by: {dt.entity.host}
        | filter cpu < 10
        | fieldsAdd host_name = entityName(dt.entity.host)
        ```

        Identifies potentially underutilized hosts that could be candidates for rightsizing or decommissioning.

    !!! tip
        **CloudOps Best Practice:** Run these governance queries regularly or build dashboards to track compliance and resource utilization over time. This helps identify cost savings opportunities and ensures adherence to organizational policies.

!!! success "Checkpoint"
    Before proceeding to the next section, verify:

    - You accessed logs for the VM from the Clouds App
    - You created a Notebook with DQL queries for logs and metrics
    - You can run DQL queries and visualize the results
