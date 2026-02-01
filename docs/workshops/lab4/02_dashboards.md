# Lab 4: Dashboards & Notebooks

## 4.2 Dashboards Overview

Get your first fully functional dashboard up and running in minutes with this quick guided tour. We'll show you how to add queries, external data, markdown, and variables—without long explanations or tutorials.

With Dashboards, you can:

- Query, visualize, and observe all your data stored in [Grail](https://www.dynatrace.com/support/help/shortlink/dynatrace-grail).
- Write custom JavaScript with [ad-hoc functions](https://dt-url.net/developer-dashboards) to fetch external data.
- Annotate all your visualizations with markdown to enrich them with context.
- Add variables to filter your results and make your dashboard dynamic.

!!! tip
    🧮 Want to know more about the Dynatrace Query Language?
    🎓 <a href="https://dt-url.net/learndql">Learn DQL </a> at the Dynatrace playground. 🎓


### Tasks to complete this step
1. Open the Dashboards app from the Left Menu
1. Select `+ Dashboard`
1. Select `+` to add dashboard element
1. Select Query Grail.
    ![image](img/lab4-dashboards1.png)
1. In the tile editor for Query, enter the following DQL
    ```
        fetch logs
        | filter cloud.provider == "azure"
        | summarize count(), by:{azure.resource.type}
        | sort `count()`, direction:"descending"
    ```
1. Select Run Query. For logs, your results will be generated in a table by default.
1. Select Select visualization tab to display the results differently.
    ![image](img/dashboards-app-getting-started.gif)
