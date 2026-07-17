# ResponseClustering

A frontend visualization tool for exploring semantic clustering of LLM responses.

This project presents clustered response data in an interactive UI, making it easier to inspect representative responses, compare related items, and understand how semantic clustering algorithms group similar outputs.

## What It Does

* Displays LLM response clusters in a clean card-based interface
* Highlights representative medoid items for each cluster
* Supports searching across clusters, prompts, and queries
* Provides an expandable graph panel for visualizing cluster relationships
* Helps evaluate how clustering algorithms can improve diversity in generated results

## Tech Stack

* **Frontend:** React, JavaScript, Vite
* **UI:** Material UI, CSS Modules
* **Visualization:** React Flow
* **Deployment:** GitHub Pages

## Project Structure

```text
client/
├── src/
│   ├── components/
│   │   ├── ClusterCard/
│   │   ├── ClusterGrid.jsx
│   │   ├── CollapsiblePanel/
│   │   ├── FlowGraph/
│   │   ├── HoverCard/
│   │   └── Navbar/
│   ├── App.jsx
│   └── App.css
├── package.json
└── vite.config.js
```

## Getting Started

```bash
cd client
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
npm run deploy
```

## Project Impact

Semantic clustering is useful for evaluating large sets of LLM outputs, especially when trying to identify redundancy, compare response diversity, or surface representative examples. This project focuses on making those clusters easier to inspect visually through a lightweight, recruiter-friendly frontend.
