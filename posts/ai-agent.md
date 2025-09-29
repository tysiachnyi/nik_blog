---
title: Creating AI Agents with Open Source Models
date: 2025-09-08
excerpt: Build a retrieval-capable AI agent using LangChain, a local Ollama model (llama3.1), and the Tavily search API with a decision layer that skips unnecessary tool calls.
tags: AI, machine learning, langchain, javascript, typescript, nodejs, ollama, agents, search, tavily
---

Building AI agents that can intelligently decide when to use tools like web search can greatly enhance their capabilities. In this guide, we'll create a simple AI agent using LangChain, a local Ollama model (llama3.1), and the Tavily search API. The agent will include a decision layer that determines whether to answer directly or perform a web search based on the user's query.

## Step-by-Step Code Walkthrough

### 1. Initialize the Project

initialize a new npm project if you haven't already:

```bash
touch package.json
```

Add this to your package.json

```json
{
  "name": "ai-agent",
  "version": "1.0.0",
  "description": "",
  "license": "MIT",
  "author": "",
  "type": "commonjs",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "@langchain/community": "^0.3.49",
    "@langchain/core": "^0.3.65",
    "@langchain/langgraph": "^0.3.10",
    "@langchain/ollama": "^0.2.3",
    "@langchain/openai": "^0.6.2",
    "dotenv": "^17.2.0"
  }
}
```


create a .mts file
```bash
touch index.mts
```

### 2. Import the Tools

We will use the following imports:

```ts
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { RunnableSequence } from "@langchain/core/runnables";
import { Ollama } from "@langchain/ollama";
import readline from "readline";
import "dotenv/config";
```

### 3. Set Up the Search and Model

we will use Tavily for web search and Ollama for local LLM.
Model configuration can be adjusted as needed.

Download ollama from [ollama.com](https://ollama.com/download) and install it.
the same for the llama3.1 model. [model link](https://ollama.com/library/llama3.1)

for tavily, sign up at [tavily.com](https://tavily.com) and get your API key.

save it to the .env file in the root of your project:

```
TAVILY_API_KEY=your_api_key_here
```


```ts
const tavily = new TavilySearchResults({
  maxResults: 3,
  apiKey: process.env.TAVILY_API_KEY,
});
const ollama = new Ollama({ model: "llama3.1", temperature: 0.8 });
```


### 4. The Decision Layer: Answer or Search?

This function decides if the model can answer directly, or if it should search the web first.

```ts
const answerOrSearch = async (userInput) => {
  const directAnswer = await ollama.invoke(
    `You are an expert assistant. If you know the answer to the user's question,
     provide a direct and complete answer. 
		If you do not know the answer or cannot answer confidently, 
    reply with only the word SEARCH.\n\nUser question: ${userInput}`,
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

### 5. The Search-and-Answer Chain

This sequence rewrites the query, searches, and answers using the results.

```ts
const chain = RunnableSequence.from([
  // Step 1: Prepare search request
  async (query) => {
    const searchRequest = await ollama.invoke(
      `Rewrite the following user query to create a concise, highly relevant search request for a web search.
      \n- Make the search request as short and specific as possible.
      \n- Focus only on the key information needed to get the best search results.
      \n- Do not include the original query, explanations, or any extra context.
      \n- Return only the improved search request, nothing else.
      \n\nExample:\nUser query: \"What is the weather in San Francisco?\"\nSearch request: 
      \"weather San Francisco\"\n\nUser query: \"${query}\"`,
    );
    return searchRequest;
  },
  // Step 2: Get search results
  async (query) => {
    const searchResults = await tavily.call(query);
    return { query, searchResults };
  },
  // Step 3: Format prompt
  ({ query, searchResults }) => {
    return `Search results for \"${query}\":\n${JSON.stringify(searchResults, null, 2)}
    \n\nAnswer the user's question using the search results above.`;
  },
  // Step 4: Call Ollama
  async (prompt) => await ollama.invoke(prompt),
]);
```

### 6. Run the Agent

```js
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.question("Ask me anything: ", async (userInput) => {
	await answerOrSearch(userInput);
	rl.close();
```

Run the script with:

```bash
npx tsx agent.mts
```
Type your question when prompted.

### Example 

```bash
Ask me anything: Who is the president of France?
Updated search request: "president France"
Searching for: "president France"
... (search results and answer)
```



## Conclusion & Next Steps

You’ve just built a smart, efficient AI agent that combines local AI with real-time web search.
This pattern is powerful for building assistants, chatbots, or research tools.

**Want to go further?**

- Add more tools (summarization, code execution, etc.)
- Connect to different models or APIs
- Build a web or chat UI for your agent

Happy hacking!

Working example code can be found in my [GitHub repository](https://github.com/tysiachnyi/free-search-agent)
