# Lab 5: AI Observability

## 5.7 Summary

As organizations adopt generative AI and LLMs, traditional monitoring falls short due to non-deterministic behavior, complex dependencies, hidden costs, and quality risks. Dynatrace AI Observability provides comprehensive visibility into AI applications, helping teams ensure reliability, performance, security, and compliance.

### What You Accomplished

In this lab, you explored the Travel Advisor application (an AI-powered app using Azure OpenAI) and completed the following:

| Section | Accomplishment |
|---------|----------------|
| **5.2 AI Observability App** | Explored the AI Observability interface, located the travel-advisor service, and reviewed key metrics (request count, error rate, latency, tokens) |
| **5.3 Service Health** | Monitored LLM service health indicators including success rate, failure rate, and throughput; viewed prompt traces |
| **5.4 Cost & Tokens** | Analyzed token consumption (input, output, total tokens) and used DQL to query token usage by model |
| **5.5 Latency** | Troubleshot latency issues by reviewing response time distribution (average, P95, P99) and comparing latency across models |
| **5.6 Traces** | Explored distributed traces to view prompts, responses, token counts, and model parameters for individual AI requests |

### Key Takeaways

- **Unified AI Visibility** — The AI Observability app provides a centralized view of all AI-powered services with metrics for requests, errors, latency, and token consumption
- **Cost Management** — Token usage directly impacts cost; monitoring consumption patterns helps identify inefficient prompts and optimize model selection
- **Latency Analysis** — Different models have different response characteristics; understanding latency distribution helps balance quality vs. speed requirements
- **Complete Audit Trail** — Dynatrace captures prompts and responses for every AI interaction, essential for compliance, debugging, and responsible AI governance
- **DQL for AI Data** — Use DQL queries in Notebooks to analyze AI observability data, including token consumption by model and slow request patterns

### What's Next?

In **Lab 6**, you will find cleanup instructions for the workshop resources and additional resources for continuing your Dynatrace and Azure journey.
