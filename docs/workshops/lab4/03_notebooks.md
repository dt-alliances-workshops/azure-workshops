# Lab 4: Dashboards & Notebooks

## 4.3 Notebooks Overview

Want to explore data and create powerful, data-driven documents for sharing and collaboration? You're in the right place. If you're already familiar with Notebooks, you can get going with an empty notebook. If you ever want to revisit this page, you'll find it under Getting started in the (?) menu.

With Notebooks, you can:
- Query, analyze, and visualize all your observability data, including logs, metrics, and events powered by <a href="https://www.dynatrace.com/support/help/shortlink/dynatrace-grail" target="_blank">Grail</a>.
- Create and collaborate on interactive, data-driven, and persistent documents.
- Fetch and incorporate external data with ad-hoc <a href="https://dt-url.net/functions-help" target="_blank">functions</a>.
- Add markdown to provide context and bring colleagues along.

In each notebook, you can add sections of Query, Code, and Markdown. On this page, we show you how to work with each one.

### Tasks to complete this step
1. Open the Notebooks app from the Left Menu
1. Select `+ Notebook`
1. Add a query
    - Select + to open the sections menu.
    - Select Query Grail.
        ![image](img/lab4-notebooks1.png)
    - Type `fetch logs` for this example.
    - Adjust the timeframe, if you want. The default is the last 2 hours.
    - Then, select Run query.
    ![image](img/lab4-notebooks2.gif)
1. Use filters to refine your query
    - You can refine query results in lots of ways. Let's try refining your query result with a simple host filter.
    - In the table, select the cell with the relevant host.
    - Select Filter.
        ![image](img/lab1-use-filters-to-refine-your-query.jpg)
    - You just filtered your query results by the host. Nicely done. The filter only applies to the current section of your notebook
1. Now, let's say you want summarize number of records by process group.
        - In the `dt.entity.process_group` column, click on column header.
            ![image](img/lab4-notebooks3.gif)

    ??? info
        ℹ️ 📓If you want to go further and learn more about using DQL to refine queries in Notebooks, visit <a href="https://www.dynatrace.com/support/help/observe-and-explore/query-data/dynatrace-query-language" target="_blank">Dynatrace Query Language</a>.

3. Visualize your data in different ways
    - When you're working with complex data, you'll find it useful to see a record list, which is a simple list of records that contains all the fields.

    - Simply select the record list tab and you're done.
At other times, a chart or graph may be more effective for communicating a trend, event, or insight. Dynatrace gives you a variety of options. Let's try creating a bar chart.
        - Select Visualizations.
        - Select Change visualization.
        - Choose the Bar chart.
        ![image](img/lab1-visualize-data-in-different-ways.jpg)
4. Add Code
    - Code sections are useful when you want to add external data to your notebook. Code sections run as a serverless function. To learn more, visit <a href="https://developer.dynatrace.com/preview/develop/functions/" target="_blank">Dynatrace functions</a>. Let's add code using a snippet to fetch external data: Select + to open the sections menu.

        - Under Code, select Fetch external data.
        - Give the different templates a try. They'll save you time and effort.
        ![image](img/lab1-add-code.jpg)
