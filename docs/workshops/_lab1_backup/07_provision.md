# Lab 1: Setting up Environment

## 1.7 Provision the Workshop

This step will automatically provision several Azure resources and Dynatrace configuration needed for the workshop via a shell script.

!!! tip "Take a break"
    The process to provision everything will take ~15-20 minutes.


??? info "What exactly is this script doing?"
    1. Add Azure resources
      - Add a Resource Group for all the VMs named: `dynatrace-azure-grail-modernize`
      - Add VM named: `dt-orders-monolith`. At startup, it installs Docker and the Dynatrace Orders application in the Monolith configuration. OneAgent is installed using Azure extension
      - Add Azure Kubernetes Cluster named `dynatrace-azure-grail-cluster`.
    2. Set Dynatrace configuration
      - Set global [Frequent Issue Detection](https://www.dynatrace.com/support/help/how-to-use-dynatrace/problem-detection-and-analysis/problem-detection/detection-of-frequent-issues/) settings to Off
      - Adjust the [Service Anomaly Detection](https://dynatrace.com/support/help/platform/davis-ai/anomaly-detection/adjust-sensitivity-anomaly-detection/adjust-sensitivity-services/) global settings to a fixed error threshold
      - Add [Management Zones](https://www.dynatrace.com/support/help/how-to-use-dynatrace/management-zones/) for the monolith and micro services versions of the application
      - Add [Auto Tagging Rules](https://www.dynatrace.com/support/help/how-to-use-dynatrace/tags-and-metadata/) to drive management zone and SLO settings
      - Add [SLOs](https://www.dynatrace.com/support/help/how-to-use-dynatrace/service-level-objectives/) for a use in custom dashboards
      - Add [Azure Monitor Integration](https://www.dynatrace.com/support/help/setup-and-configuration/setup-on-cloud-platforms/microsoft-azure-services/azure-integrations/azure-cloud-services-metrics/monitor-azure-integration-service-environment)


??? info
    📓The Dynatrace configuration scripts use a combination of [Dynatrace Monitoring as Code](https://github.com/dynatrace-oss/dynatrace-monitoring-as-code) framework (a.k.a. monaco) and the [Dynatrace Configuration API](https://www.dynatrace.com/support/help/dynatrace-api/configuration-api/) for those few Dynatrace configurations not yet supported by monaco.


### Tasks to complete this step
1. Open up Azure Cloud shell open

1. Copy the command from below and hit enter it into your Azure Cloud shell and hit enter.
    ```
      ./provision-workshop.sh grail
    ```

1. You should see a prompt similar to as one below.

    ```
      ===================================================================
      About to setup Dynatrace Grail Workshop
      Dynatrace Server: https://name.live.dynatrace.com
      SETUP_TYPE   = grail
      ===================================================================
      Proceed? (y/n) :
    ```
1. Enter **y** at the prompt to begin the provisioning of the workshop.  Once the script is complete you should see output as shown below
    ```
      =============================================
      Provisioning workshop resources COMPLETE
      End: Thu 25 Nov 2021 12:45:29 PM UTC
      =============================================
    ```
