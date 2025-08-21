const express = require('express');
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

/**
 * S3 Client Configuration
 * bucketName = shippify-public-file
 * aws credentials
 */

function haversineDistance(lat1, lon1, lat2, lon2) {}

/**
 * POST /match
 * Body: { drivers: [...], shipments: [...] }
 */
app.post('/match', (req, res) => {
  const { drivers, shipments } = req.body;

  // TODO: Implement matching logic
  // 1. Input validation
  // 2. Calculate distances between drivers and shipments
  // 2. Assign closest driver to each shipment
  // 3. Handle unassigned shipments and unused drivers
  // 4. Save to S3

  const s3Url = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${key}`;

  res.json({
    assignments: [],
    unassignedShipments: [],
    unassignedDrivers: [],
    s3ResultUrl: ''
  });
});

app.listen(PORT, () => {
  console.log(`Driver–Shipment Matching Simulator running on port ${PORT}`);
});
