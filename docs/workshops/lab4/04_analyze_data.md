# Lab 4: Dashboards & Notebooks

## 4.4 Use DQL in Notebooks to Analyze Data

In this section, you'll import pre-built notebooks that demonstrate how to analyze logs and metrics using DQL.

### Tasks to complete this step

=== "Analyze Logs"

    **Download and import the Logs notebook:**

    1. Download the sample notebook:
        - Right click in browser, click `Save As`
        - Click on <a href="https://raw.githubusercontent.com/dt-alliances-workshops/azure-modernization-dt-orders-setup/grail/learner-scripts/AzureGrailWorkshop-Logs.json"> this link </a> to download the file
        - Save it under the default filename
        ![image](img/lab4-notebooks-saveas.png)

    2. Go into Dynatrace UI, open the Notebooks app from your left menu
        ![image](img/lab3-grail-notebooks.png)

    3. Expand the Notebooks menu
        ![image](img/lab3-grail-notebooks-expand.png)

    4. Click on upload and browse to the notebook JSON file where you saved

    5. Follow the instructions in the notebook to analyze log data from the sample app

=== "Analyze Metrics"

    **Download and import the Metrics notebook:**

    1. Download the sample notebook:
        - Click on <a href="https://raw.githubusercontent.com/dt-alliances-workshops/azure-modernization-dt-orders-setup/grail/learner-scripts/AzureGrailWorkshop-Metrics.json"> this link</a> to download the file
        - Save it under the default filename
        ![image](img/lab4-notebooks-saveas.png)

    2. Go into Dynatrace UI, open the Notebooks app from your left menu
        ![image](img/lab3-grail-notebooks.png)

    3. Expand the Notebooks menu
        ![image](img/lab3-grail-notebooks-expand.png)

    4. Click on upload and browse to the notebook JSON file for Metrics

    5. Follow the instructions in the notebook to analyze metrics for your hosts

=== "Analyze BizEvents"

    **Download and import the BizEvents notebook:**

    1. Download the sample notebook:
        - Click on <a href="https://raw.githubusercontent.com/dt-alliances-workshops/azure-modernization-dt-orders-setup/grail/learner-scripts/AzureGrailWorkshop-BizEvents.json"> this link</a> to download the file
        - Save it under the default filename
        ![image](img/lab4-notebooks-saveas.png)

    2. Go into Dynatrace UI, open the Notebooks app from your left menu
        ![image](img/lab3-grail-notebooks.png)

    3. Expand the Notebooks menu
        ![image](img/lab3-grail-notebooks-expand.png)

    4. Click on upload and browse to the notebook JSON file for BizEvents

    5. Follow the instructions in the notebook to analyze business events from the sample app

!!! success "Checkpoint"
    Before proceeding to the next section, verify:

    - You downloaded and imported at least one pre-built notebook
    - You successfully ran the queries in the imported notebook
    - You understand how to use DQL to analyze logs and metrics
