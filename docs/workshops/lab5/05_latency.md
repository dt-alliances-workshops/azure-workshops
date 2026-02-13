# Lab 5: AI Observability

## 5.5 Troubleshoot Latency Issues

### Overview

Slow LLM responses can significantly impact user experience. Dynatrace helps you identify latency bottlenecks and understand what contributes to slow AI responses.

### Tasks to complete this step

1. Review the latency distribution
    - From the travel-advisor service view, examine the response time chart
    - Look for:
        - Average latency
        - P95/P99 latency (worst-case scenarios)
        - Latency trends over time
    ![image](img/lab5-latency-distribution.png)

2. Filter for slow models
    - Use filters to select a specific type analyze how the response and latency is for that model compared to others.
    - Note any patterns in slower models

3. Compare latency across models
    - Different models have different response characteristics:
        - GPT-4 typically has higher latency but better quality
        - GPT-3.5-turbo is faster but may produce simpler responses
    - Verify if model selection aligns with latency requirements


    !!! tip
        **Performance Tip:** If latency is critical, consider implementing streaming responses or using faster models for time-sensitive interactions.  When identifying patterns for latency, check for token count and specific prompt types that could be contributing to slowdown and latency.



!!! success "Checkpoint"
    Before proceeding to the next section, verify:

    - You reviewed the latency distribution (average, P95, P99)
    - You filtered for slow requests exceeding acceptable thresholds
    - You compared latency across different models
    - You identified patterns correlating latency with time, tokens, or prompt types
