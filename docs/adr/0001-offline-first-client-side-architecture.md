# 1. Offline-First Client-Side Architecture

Date: 2026-07-28

## Status

Accepted

## Context

FlipCalc is designed to be used by retail resellers actively sourcing inventory inside large thrift stores and retail warehouses. These environments notoriously have poor or non-existent cellular reception. A traditional web application architecture that relies on REST APIs and a remote backend database (like PostgreSQL or MongoDB) would experience severe latency or total failure in these dead zones, rendering the tool useless when the user needs it most. 

We need a data storage and execution model that guarantees zero latency and 100% uptime regardless of network connectivity.

## Decision

We will architect FlipCalc as a completely offline-first, client-side application. 

1. **Storage:** All persistent data (user settings, running inventory cart) will be stored directly on the device using the browser's native `localStorage` API.
2. **State Management:** We will wrap `localStorage` in a custom React hook (`useLocalStorage`) and distribute it via the React Context API (`AppStateContext`) to keep the UI perfectly synchronized with the local cache.
3. **ID Generation:** Instead of relying on a database to generate primary keys, we will use the browser's native `crypto.randomUUID()` API to generate secure, unique identifiers for inventory items offline.

## Consequences

### Positive
* **Zero Latency:** Margin calculations and budget updates happen instantaneously on the device's main thread, providing a seamless native-app feel.
* **High Reliability:** The application is completely immune to network dead zones, ensuring reliability during physical sourcing trips.
* **Zero Infrastructure Costs:** With no backend servers or remote databases to host, the application can be deployed as a purely static bundle via GitHub Pages for free.

### Negative
* **Device-Bound Data:** Because data is stored in `localStorage`, a user's inventory and settings will not automatically sync across multiple devices (e.g., between their phone and their laptop).
* **Data Volatility:** If a user manually clears their browser data or strictly uses volatile private browsing modes, their inventory and settings will be wiped.
* **Storage Limits:** We are bound by standard browser storage quotas (typically around 5MB per origin). However, for purely text-based inventory lists and numerical settings, this is more than sufficient overhead.
