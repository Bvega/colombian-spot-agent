# The Colombian Spot • Agentic AI Ordering & Discovery PWA

> **An Agentic Commerce and Generative Engine Optimization (GEO) prototype built for The Colombian Spot in Pittsburgh, PA (South Side & Oakland).**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://the-colombian-spot-agent.vercel.app)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa)](https://the-colombian-spot-agent.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

---

## 🎯 Executive Summary & Problem Statement

Independent restaurants face high commission fees on third-party delivery marketplaces (DoorDash, Uber Eats, Grubhub), often paying **15% to 30%+ per order**. Concurrently, consumer search behavior is evolving from standard browser-based search engine queries toward **conversational search and agentic AI discovery** (e.g., ChatGPT, Gemini, Perplexity, and Apple Intelligence).

This project demonstrates a zero-friction, direct ordering architecture that:
1. **Exposes machine-readable menu and dietary data** via Generative Engine Optimization (`/llms.txt` and `Schema.org/Restaurant`).
2. **Provides an installable Progressive Web App (PWA)** with an interactive conversational ordering interface.
3. **Retains 100% of order margins ($0.00 commission)** using direct on-demand fulfillment workflows.
4. **Supports dual-location operations, catering qualification, and table reservations** for Pittsburgh's South Side and Oakland storefronts.

---

## ✨ Key Features

- **📱 Mobile-First Progressive Web App (PWA):**
  - Standalone app experience ("Add to Home Screen" support with custom branding).
  - Offline asset and catalog caching via Service Worker (`sw.js`).
  - Native feel with horizontal momentum touch scrolling and zero-scrollbar layout.
- **🤖 Conversational Ordering Agent:**
  - Automated dietary filtering (highlighting 100% gluten-free corn arepas, empanadas, and bowls).
  - Real-time cart calculation and checkout flow showing commission savings.
  - Interactive "Reset Chat" capability for multi-demo presentations.
- **📍 Multi-Location & Service Architecture:**
  - **South Side (2019 E Carson St):** Sit-down casual dining, lunch & dinner, table reservations.
  - **Oakland (3533 Forbes Ave):** Fast-casual counter service for university and hospital corridor traffic.
  - **Interactive Locations Modal:** Fast access to operating hours and Google Maps directions.
- **🎉 High-Ticket Catering Lead Engine:**
  - Automated qualification for the *Build-Your-Own Arepa Bar* (minimum 10 guests) and party platters.
- **⚡ Generative Engine Optimization (GEO):**
  - Standardized root `/llms.txt` exposing API action definitions directly to LLM web crawlers.

---

## 🛠️ Architecture & Tech Stack
