## Driver–Shipment Matching Simulator

# Technical Test – Jr Backend

### Context

In this test, you will simulate a **real backend task** at Shippify.

The operations team is facing an **emergency**:

The matching system went down over the weekend, leaving **hundreds of shipments** unassigned.

Your mission is to **simulate** the driver–shipment matching system so dispatchers can continue working while the main service is fixed.

---

## Objective

Create an **Express.js POST endpoint** in Node.js that performs the following:

1. **Receive input data** via an **HTTP POST** request containing:
    - A list of **drivers** (ID, coordinates, and deliveries completed).
    - A list of **shipments** (ID and coordinates).
2. **For each shipment**, assign the closest available driver.
3. Each driver can take **only one** shipment.
4. If no driver is available for a shipment, mark it as **unassigned**.
5. Return:
    - A list of assignments including **distance in km** (rounded to 2 decimals).
    - A list of **unassigned shipments**.
    - A list of **unused drivers**.

---

### Example Input

```json
{
  "drivers": [
    { "id": "D1", "lat": -0.1807, "lng": -78.4678, "deliveriesCompleted": 5 },
    { "id": "D2", "lat": -0.1900, "lng": -78.4800, "deliveriesCompleted": 2 },
    { "id": "D3", "lat": -0.1750, "lng": -78.4600, "deliveriesCompleted": 3 }
  ],
  "shipments": [
    { "id": "S1", "lat": -0.2000, "lng": -78.4900 },
    { "id": "S2", "lat": -0.1700, "lng": -78.4650 }
  ]
}

```

---

### Expected Output

```json
{
  "assignments": [
    { "shipmentId": "S1", "driverId": "D2", "distanceKm": 2.35 },
    { "shipmentId": "S2", "driverId": "D3", "distanceKm": 1.12 }
  ],
  "unassignedShipments": [],
  "unassignedDrivers": ["D1"]
}

```

---

### Rules

- Distances must be calculated using the **Haversine formula**.
- If `drivers` or `shipments` is empty, return an error.
- **Fairness rule:**
    
    If two drivers are exactly the same distance from a shipment, assign the one with **fewer deliveries completed** (`deliveriesCompleted` field).
    
- The `assignments` list must be **sorted by shortest distance first**.

---

### Optional Extras (Bonus Points)

- Accept a `maxDistanceKm` parameter to skip shipments too far from any driver.
- Return the **total distance** covered by all assigned drivers.

---

## Provided Files

The repository you will fork contains:

- `index.js` → Starter Express endpoint (logic not implemented).

## Submission

1. **Fork** the original GitHub repository: [**`https://github.com/shippify/tech-interviews/backend-jr-challenge`**](https://www.notion.so/Backend-30-mins-24912304bb2e8095aea9ce0a14f55af5?pvs=21)
2. Clone your fork to your local machine and implement the matching logic in the provided `index.js`.
3. Commit your changes.
4. Push your code to your forked repository on GitHub.
5. Open a **Pull Request (PR)** from your fork to the original repository.
6. In the PR description, include any notes or explanations about your implementation.

---

### Evaluation Criteria

- Correct and efficient matching logic.
- Clean, modular, and readable code.
- Proper handling of asynchronous operations (if used).
- Input validation and error handling.
- Clear, consistent output format.
- Good repository structure and documentation.