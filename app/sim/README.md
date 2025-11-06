# sim (Simulation Layer)

## Contents

- [Overview](#overview)
- [Carrier tracking number generation](#carrier-tracking-number-generation)
- [Carrier delivery confirmation](#carrier-delivery-confirmation)

## Overview

This folder contains simulation logic for external systems that would normally sit outside of my microservice architecture.

This is **NOT development-only**.<br>
It's present in the production environment as well because the purpose is to show real-life lifecycle end-to-end without having to integrate with actual third-parties, such as parcel carriers (e.g. DHL, UPS).

## Carrier tracking number generation

### How this works in real systems

Carriers assign tracking numbers at the moment the shipment is created.<br>
Here, we generate a tracking number on our own.

### How this works here

1. Warehouse generates and emits a tracking number when shipping an order
2. Order Service can store and display it
3. Downstream services can reference it

## Carrier delivery confirmation

### How this works in real systems

This update would arrive via a carrier webhook (exposed HTTP endpoint)
and the carrier would POST delivery state changes to our service.

### How this works here

I simulate this behaviour by scheduling delayed callbacks that emit `carrier.order.delivered.v1` (and potentially other delivery outcomes) after some time.

1. Warehouse ships a parcel
2. The simulated carrier eventually reports a delivery outcome (implemented here as an `carrier.order.delivered.v1` event emitted by the Warehouse Service)
3. Order Service consumes that event and updates the order in its database
4. Downstream services can reference it
