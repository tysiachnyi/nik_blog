---
title: Creating AI Agents with Open Source Models
date: 2025-08-26
excerpt: Build a retrieval-capable AI agent using LangChain, a local Ollama model (llama3.1), and the Tavily search API with a decision layer that skips unnecessary tool calls.
tags: - AI - machine-learning - langchain - javascript - typescript - nodejs - ollama - agents - search - tavily
---

Building AI agents that can intelligently decide when to use tools like web search can greatly enhance their capabilities. In this guide, we'll create a simple AI agent using LangChain, a local Ollama model (llama3.1), and the Tavily search API. The agent will include a decision layer that determines whether to answer directly or perform a web search based on the user's query.

## Step-by-Step Code Walkthrough

### 1. Import the Tools

```js
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { RunnableSequence } from "@langchain/core/runnables";
import { Ollama } from "@langchain/ollama";
import readline from "readline";
import "dotenv/config";
```

### 2. Set Up the Search and Model

```js
const tavily = new TavilySearchResults({
  maxResults: 3,
  apiKey: process.env.TAVILY_API_KEY,
});
const ollama = new Ollama({ model: "llama3.1", temperature: 0.8 });
```

### 3. The Decision Layer: Answer or Search?

This function decides if the model can answer directly, or if it should search the web first.

```js
const answerOrSearch = async (userInput) => {
  const directAnswer = await ollama.invoke(
    `You are an expert assistant. If you know the answer to the user's question, provide a direct and complete answer. 
		If you do not know the answer or cannot answer confidently, reply with only the word SEARCH.\n\nUser question: ${userInput}`,
  );
  if (directAnswer && !/SEARCH/i.test(directAnswer)) {
    console.log("Direct answer from model:");
    console.log(directAnswer);
    return;
  }

  const result = await chain.invoke(userInput);
  console.log("Answer with search:");
  console.log(result);
};
```

### 4. The Search-and-Answer Chain

This sequence rewrites the query, searches, and answers using the results.

```js
const chain = RunnableSequence.from([
  // Step 1: Prepare search request
  async (query) => {
    const searchRequest = await ollama.invoke(
      `Rewrite the following user query to create a concise, highly relevant search request for a web search.\n- Make the search request as short and specific as possible.\n- Focus only on the key information needed to get the best search results.\n- Do not include the original query, explanations, or any extra context.\n- Return only the improved search request, nothing else.\n\nExample:\nUser query: \"What is the weather in San Francisco?\"\nSearch request: \"weather San Francisco\"\n\nUser query: \"${query}\"`,
    );
    console.log(`Updated search request: ${searchRequest}`);
    return searchRequest;
  },
  // Step 2: Get search results
  async (query) => {
    console.log(`Searching for: ${query}`);
    const searchResults = await tavily.call(query);
    return { query, searchResults };
  },
  // Step 3: Format prompt
  ({ query, searchResults }) => {
    return `Search results for \"${query}\":\n${JSON.stringify(searchResults, null, 2)}\n\nAnswer the user's question using the search results above.`;
  },
  // Step 4: Call Ollama
  async (prompt) => await ollama.invoke(prompt),
]);
```

### 5. Run the Agent

```js
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.question("Ask me anything: ", async (userInput) => {
	await answerOrSearch(userInput);
	rl.close();
```

## Conclusion & Next Steps

You’ve just built a smart, efficient AI agent that combines local AI with real-time web search. This pattern is powerful for building assistants, chatbots, or research tools.

**Want to go further?**

- Add more tools (summarization, code execution, etc.)
- Connect to different models or APIs
- Build a web or chat UI for your agent

Happy hacking!

Working example code can be found in my [GitHub repository](https://github.com/tysiachnyi/free-search-agent)
