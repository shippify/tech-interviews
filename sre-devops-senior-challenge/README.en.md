# Technical Test – Senior SRE

## Overview

This technical test is designed to evaluate your skills as a **Senior Site Reliability Engineer (SRE/DEVOPS)** at Shippify. During this test, you will work with AWS services to solve real infrastructure, monitoring, and cost optimization problems.

The test is divided into two main parts that will evaluate:
- **Part 1 - Technical questions**: Monitoring, alerts and FinOps (10 minutes)
- **Part 2 - Use case**: Troubleshooting and investigation of latency issues (40 minutes)

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

### 1. **Availability and latency alarms (5 min)**

**Objective**: Configure CloudWatch alarms to monitor application health.

**Tasks**:
- Create CloudWatch alarms for:
  - a) `5XXError` from the `ALB` (Application Load Balancer)
  - b) `TargetResponseTime p95` (95th percentile response time)
- Configure notifications to be sent to SNS: `dev-topic`

---

### 2. **FinOps (5 min)**

**Objective**: Propose strategies to reduce operational costs in AWS.

**Context**: 
Two high costs have been identified in the last month:

1. **Historical S3 object storage**: $1000 monthly
2. **CloudWatch log storage**: $500 monthly

**Tasks**:
- For each of these costs, propose a solution strategy

---

## 🔹 PART 2: Use Case (40 minutes)

### Test Environment

```
- Region: sa-east-1
- Lambda: lambda-function-test-infra-stg-testSlowLambda-r1
- API Gateway: Slow Lambda Test API
- DynamoDB Table: slow-lambda-test-table
```

---

### ⚙️ Case 1: Lambda with intermittent latency — *Throttling or cold starts*

#### Context

The development team reported on **November 10th** that an **API Gateway + Lambda** endpoint is taking more than 5 seconds to respond, but **not all the time**. The Lambda accesses a **DynamoDB table** to perform operations.

**You must review historical metrics from November 10th** to investigate the problem and test the endpoint again to see the current behavior.

#### Endpoint to Test

```bash
curl --location 'https://fmd35obzgb.execute-api.sa-east-1.amazonaws.com/dev/test'
```

#### Example Response

```json
{
    "success": true,
    "executionTime": {
        "total": 4950,
        "coldStart": 4731,
        "dynamoDBRead": 120,
        "dynamoDBWrite": 99
    },
    "requestId": "aeb988d6-025d-4f8e-a564-741b80b82b77",
    "key": "test",
    "timestamp": "2025-11-11T15:47:03.179Z",
    "message": "Operation completed successfully"
}
```

#### Tasks

1. **Problem investigation** (15 min)
   - Investigate the cause of the problem

2. **Instrumentation and monitoring** (10 min)
   - Implement instrumentation or metrics to automatically detect this problem in the future

3. **Zero-downtime solution** (15 min)
   - If it's identified that the problem comes from DynamoDB, implement a solution without downtime

---

## 📋 Evaluation Criteria

- **Monitoring**: Ability to configure effective and relevant alarms
- **FinOps**: Understanding of AWS cost optimization strategies
- **Troubleshooting**: Systematic methodology to investigate problems
- **Solution**: Ability to propose practical solutions without production impact
- **Communication**: Clarity in explaining processes and decisions

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

