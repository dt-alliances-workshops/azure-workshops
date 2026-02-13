# Lab 5: AI Observability

## 5.6 Explore Traces with Prompts and Responses

### Overview

Distributed tracing provides deep visibility into individual AI requests, including the actual prompts sent to the model and the responses received. This is invaluable for debugging issues, understanding model behavior, and ensuring compliance.

### Tasks to complete this step

1. From the left menu, click on Apps -> Services 
    - Select Explorer from the top menu
    - From the service view, select `openai-travel-advisor`
    ![image](img/lab5-ai-service-view.png)
2. Let's quickly review the service metrics that Dynatrace collects to give you a high level overview about your service.
    - Overall Response Time for your service
    - Throughput
    - Failure Rate
    - All endpoints within your app that are being called and their respective metrics

3. Now let's dive into traces.  Click on **View traces** on upper right hand corner of your service view.
    ![image](img/lab5-traces-list.png)

4. Select a trace to examine
    - Choose a trace from the list
    - Look for traces with different characteristics:
        - Successful vs. failed requests
        - Fast vs. slow responses
        - High vs. low token usage

5. Examine the trace waterfall
    - The waterfall view shows the request flow:
        - User request received by travel-advisor
        - Prompt constructed and sent to Azure OpenAI
        - LLM processes the request
        - Response received and returned to user
    ![image](img/lab5-trace-waterfall.png)

6. View prompt and response details
    - Click on the AI span (Azure OpenAI call) to see:
        - **Prompt text** — The full prompt sent to the model
        - **Completion text** — The model's response
        - **Model parameters** — Temperature, max_tokens, etc.
        - **Token counts** — Input, output, and total tokens
    ![image](img/lab5-trace-prompt-response.png)    

7. Analyze a failed or slow trace
    - Find a trace with an error or high latency
    - Examine:
        - Error messages or exceptions
        - What prompt caused the issue
        - Whether the model returned an unexpected response

8. **(Optional)** Search traces with DQL
    - Query for specific traces based on criteria:

    ```dql title="Find Slow AI Requests"
    fetch spans
    | filter gen_ai.system == "openai"
    | filter duration > 5s
    | fields start_time, end_time, gen_ai.request.model, gen_ai.usage.prompt_tokens, gen_ai.usage.completion_tokens, duration
    | sort duration desc
    | limit 20
    ```

    ??? info
        ℹ️ Dynatrace captures prompts and responses for observability and compliance purposes. This provides a complete audit trail of AI interactions, which is essential for regulated industries and responsible AI governance.

!!! success "Checkpoint"
    Before proceeding to the next lab, verify:

    - You navigated to the distributed traces view
    - You examined a trace waterfall showing the AI request flow
    - You viewed prompt and response details in an AI span
    - You analyzed at least one failed or slow trace to understand the issue
