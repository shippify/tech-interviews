# Technical Test – Senior DBA

## Overview

This technical test is designed to evaluate your skills as a **Senior Database Administrator (DBA)** at Shippify. During this test, you will work with MySQL, AWS, and database optimization to solve real performance and modeling problems.

The test is divided into two main parts that will evaluate:
- **Part 1 - Technical questions**: Environment setup and installation (10 minutes)
- **Part 2 - Practical cases**: Query optimization and data modeling (40 minutes)

---

## 🔐 AWS Credentials

To access the test environment, use the following credentials:

```
Username: Tests
Password: Ask for Interviewer
Sign in URL: https://shippifydev.signin.aws.amazon.com/console
```

**Note**: The interviewer will provide the password at the start of the test.

---

## 🔹 PART 1: Technical Questions (10 minutes)

### 1. **EC2 Environment Setup and MySQL**

**Objective**: Verify ability to work with AWS, Linux, and MySQL.

**Tasks**:
- Create an EC2 instance
- Install MySQL 8
- Connect to MySQL via terminal
- Perform a local test connection

**Note**: You can use the internet to look up installation and configuration information.

---

## 🔹 PART 2: Practical Cases (40 minutes)

### **📊 CASE 1: Slow Query Diagnosis (15 minutes)**

#### Environment

**Credentials**

```
- Access to MySQL dev console
- User: test
- Password: Ask for Interviewer
- Host: db.dev.shippify.co
- Schema: test
```

**Note**: The interviewer will provide the password at the start of the test.

**Environment**

```
Schema: test
Tables: delivery, shipper, company
```

#### Context

A critical query for finance has been reported to be degrading system performance.

The query calculates **driver commissions** by week and company, considering only **completed deliveries** with a **minimum amount** and **active companies**.

```sql
SELECT
  s.id AS shipper_id,
  s.name AS shipper_name,
  c.name AS company_name,
  WEEK(d.created_at) AS week_number,
  SUM(d.amount * 0.1) AS total_commission
FROM delivery d
JOIN shipper s ON s.id = d.shipper_id
JOIN company c ON c.id = d.company_id
WHERE DATE(d.created_at) >= CURDATE() - INTERVAL 30 DAY
  AND c.is_active = TRUE
  AND d.status = 'completed'
  AND d.amount > 10
GROUP BY s.id, c.id, week_number
ORDER BY total_commission DESC
LIMIT 10;
```

#### Environment Information

- `delivery` table: 5 million records
- `company` table: 50 records
- `shipper` table: 300 records
- The query takes between 5-20 seconds depending on the time interval

#### Tasks

1. **Analysis and optimization** (8 min):
   - Diagnose the problem
   - Propose strategies to solve the problem
   - Explain how you would implement the strategy in production without downtime

2. **Validation** (2 min):
   - What metric would you use to validate that the optimization worked?

**Challenge**: Improve response time and justify changes.

---

### **🏗️ CASE 2: Data Modeling (25 minutes)**

#### Context

Shippify manages thousands of daily deliveries for different **companies**. Each **company** creates deliveries that are executed by **drivers**.

Each **driver** can operate in **one or more zones**, defined geographically, and can change zones depending on the day or operation.

Currently, all this information is stored in a single `deliveries` table, with JSON fields such as `driver`, `zone`, `location`, and `events`.

This has generated performance problems and difficulty making geospatial queries or reports.

#### Functional Requirements

- A **company** can create many **deliveries**
- A **driver** can have **multiple operating zones**
- A **delivery** always belongs to **one shipper** and is performed **within a single zone**
- **Zones** must allow spatial searches
- Each status change of a delivery must be able to be **saved historically**

#### Delivery Statuses

Deliveries go through the following statuses during their lifecycle:

- **ASSIGNED**: Delivery has been assigned to a driver, but has not yet been started
- **IN_TRANSIT**: Driver is on the way to pick up or deliver the order
- **PICKED_UP**: Order was picked up by the driver
- **DELIVERED**: Delivery was completed successfully
- **FAILED**: Delivery failed (could not be completed)

#### Required Queries

The new model must efficiently answer the following questions:

1. **How to get all completed deliveries in a specific zone between two dates?**

2. **How to get all active deliveries of a specific driver?**

3. **How to calculate performance (success rate) by zone?**

#### Tasks

1. **Schema design**:
   - Propose the structure of the main tables (key fields and data types)
   - Define strategic indexes that optimize the required queries: indexes, primary keys, data types

2. **Architecture**:
   - Would you use only MySQL or combine it with other database systems? Justify your decision
   - How would you handle 10M writes/day without saturating MySQL?

---

## 📋 Evaluation Criteria

- **Troubleshooting**: Systematic methodology to diagnose performance problems
- **Optimization**: Ability to identify and resolve bottlenecks in queries
- **Modeling**: Skill to design efficient and scalable schemas
- **Architecture**: Understanding of trade-offs and technical decisions
- **Implementation**: Ability to propose safe changes without downtime

---

## ⏱️ Estimated Total Time

- Part 1: 10 minutes
- Part 2: 40 minutes
- **Total: 50 minutes**

---

## 📝 Important Notes

- You can use the internet to look up information you don't know, but not to solve the entire problem
- **Use of AI is not allowed** (ChatGPT, Copilot, etc.)
- The work should be practical, written documentation is not required
- If you have questions about the environment or resources, you can ask the interviewer

Good luck!

