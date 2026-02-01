# Lab 5: AI Observability

## 5.3 Monitor LLM Service & Model Health

### Overview

Understanding service and model health is critical for maintaining reliable AI applications. Dynatrace provides real-time visibility into both the overall service health and individual model performance.

### Tasks to complete this step

1. Review service health indicators
    - From the travel-advisor service view, examine:
        - **Success rate** — Percentage of successful model responses
        - **Failure rate** — Frequency of errors or timeouts
        - **Throughput** — Requests per minute/hour
    ![image](img/lab5-service-health.png)

2. Analyze model-specific metrics
    - Click on a specific model (e.g., `gpt-4`) to view:
        - Model availability
        - Error rates by error type
        - Response time distribution
        - Token usage patterns

3. Check for Davis AI anomalies
    - Look for any problems or anomalies flagged by Davis AI
    - Davis automatically detects unusual patterns in:
        - Sudden spikes in error rates
        - Latency degradation
        - Abnormal token consumption

4. **(Optional)** Query service health with DQL
    - Open the Notebooks app and create a new notebook
    - Add a DQL section with the following query:

    ```dql title="AI Service Health Summary"
    fetch spans
    | filter ai.technology.vendor == "openai"
    | summarize
        total_requests = count(),
        error_count = countIf(otel.status_code == "ERROR"),
        avg_duration_ms = avg(duration) / 1000000,
        by: {ai.model.id}
    | fieldsAdd error_rate = (error_count / total_requests) * 100
    | sort total_requests desc
    ```

    ![image](img/lab5-service-health-dql.png)
