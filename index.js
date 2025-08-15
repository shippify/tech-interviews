const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

/**
 * POST /match
 * Body: { drivers: [...], shipments: [...] }
 */
app.post('/match', (req, res) => {
  const { drivers, shipments } = req.body;

  // TODO: Implement matching logic
  // 1. Calculate distances between drivers and shipments
  // 2. Assign closest driver to each shipment
  // 3. Handle unassigned shipments and unused drivers

  res.json({
    assignments: [],
    unassignedShipments: [],
    unassignedDrivers: []
  });
});

app.listen(PORT, () => {
  console.log(`Driver–Shipment Matching Simulator running on port ${PORT}`);
});
