# Lab 5: AI Observability

## 5.2 Explore the AI Observability App

### Overview

The Dynatrace AI Observability app provides a centralized view of all your AI-powered services, giving you instant visibility into LLM usage, performance, and health across your environment.

In this section, we'll explore the `travel-advisor` service—a sample AI application deployed on Kubernetes that helps users plan trips by leveraging Azure OpenAI.

### Tasks to complete this step

1. Navigate to the AI Observability app
    - In Dynatrace, from the menu on the left, select `Apps -> AI Observability`
    ![image](img/lab5-ai-obs-menu.png)

2. Review the AI Services dashboard
    - The dashboard displays all monitored AI-powered services
    - Note the key metrics shown: request volume, error rate, and token usage
    ![image](img/lab5-ai-obs-dashboard.png)

3. Locate the travel-advisor service
    - Find the `travel-advisor` service in the list
    - Click on it to open the service detail view

4. Explore the service overview
    - Review the high-level metrics:
        - **Request count** — Total number of AI requests
        - **Error rate** — Percentage of failed requests
        - **Average latency** — Mean response time
        - **Token consumption** — Total tokens used
    ![image](img/lab5-travel-advisor-overview.gif)

5. View the Models tab
    - Click on the **Models** tab to see which LLM models are being used
    - Note the model distribution (e.g., GPT-4, GPT-3.5-turbo)
    - Review per-model metrics for comparison

!!! success "Checkpoint"
    Before proceeding to the next section, verify:

    - You navigated to the AI Observability app
    - You located the travel-advisor service
    - You reviewed key metrics (request count, error rate, latency, tokens)
    - You explored the Models tab to see LLM usage
