# 2. Target-Based Pricing Model

Date: 2026-07-29

## Status

Accepted

## Context

In the initial iteration of FlipCalc, users were required to input an "Expected Sale Price" alongside their "Buy Cost" to calculate a predicted profit margin. This approach relied on the user guessing or knowing the market value upfront, which added cognitive load and slowed down the fast-paced physical sourcing workflow. 

Furthermore, a strict percentage-based margin calculation fails to account for low-cost items where the percentage margin is high, but the actual flat-dollar profit is too low to justify the manual effort (e.g., platform fees, shipping labor, listing time).

We need a pricing model that gives the user an absolute price floor *before* they check market comps, while also protecting them from high-effort, low-reward purchases.

## Decision

We will shift the application's core logic from a predictive pricing model to a target-based minimum viable price model.

1. **Eliminate Predictive Input:** Remove the manual "Expected Sale Price" field from the entry form.
2. **Introduce Flat-Dollar Thresholds:** Add a configurable `minProfitThreshold` to the global settings state.
3. **Target Calculation:** The `useMarginMath` hook will now calculate two independent values: the price needed to hit the target percentage margin, and the price needed to hit the flat-dollar minimum threshold.
4. **Max Value Priority:** The application will dynamically output the higher of the two calculated prices as the absolute minimum required sale price for the item to be considered a viable purchase.

## Consequences

### Positive
* **Reduced Cognitive Load:** Users no longer have to guess prices; the app tells them exactly what number they need to find in market comps.
* **Workflow Velocity:** Sourcing is faster because the user is armed with a definitive baseline before opening eBay or Facebook Marketplace.
* **Profit Protection:** The flat-dollar threshold guarantees that low-cost items are still worth the user's time after theoretical fees and shipping.

### Negative
* **Loss of Speculation:** Users can no longer input arbitrary sale prices just to see what the math *would* be if they sold it for a specific amount.
* **Settings Dependency:** The utility of the tool is now heavily reliant on the user configuring accurate settings for their specific reselling niche and fee structures.