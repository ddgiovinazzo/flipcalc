# 3. Progressive Web App (PWA) Implementation

Date: 2026-07-29

## Status

Accepted

## Context

While our `localStorage` architecture guarantees that a user's inventory *data* is safe while offline, the application UI itself (the HTML, CSS, and JavaScript bundles) historically relied on the browser's standard caching heuristics. If a user force-closed their browser, cleared their cache, or opened the URL for the first time while deep inside a retail warehouse with zero cellular reception, the app would fail to load.

To fulfill our core promise of being a 100% reliable offline companion, we need to guarantee that the application bundle is permanently stored on the device and can intercept network failures.

## Decision

We will compile FlipCalc as a Progressive Web App (PWA).

1. **Service Worker:** We will utilize `vite-plugin-pwa` to automatically generate a Service Worker during the production build. This worker will actively cache the entire compiled frontend bundle (React, Tailwind, assets) to the device's persistent storage.
2. **Web Manifest:** We will inject a `manifest.json` file with configured app icons, dictating that the app should launch in `standalone` mode to hide the browser UI and mimic a native application.
3. **Network Interception:** In the event of a network failure, the Service Worker will intercept the failed request and instantly serve the cached application bundle from the device's local drive.

## Consequences

### Positive
* **True Offline Execution:** The application achieves 100% guaranteed uptime regardless of network conditions, successfully loading even if the browser cache was recently wiped.
* **Native Experience:** Users can install the tool directly to their iOS/Android home screens, reclaiming the ~15% of screen real estate normally occupied by the Safari/Chrome navigation bars.

### Negative
* **Cache Invalidation Delays:** When a new version of FlipCalc is deployed to GitHub Pages, the Service Worker must detect the change in the background. Users may briefly see the old, cached version of the app on their first load after a deployment until the worker updates and prompts a refresh.