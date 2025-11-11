# Prueba Técnica – SRE Senior

## Descripción General

Esta prueba técnica está diseñada para evaluar tus habilidades como **Site Reliability Engineer (SRE) Senior** en Shippify. Durante esta prueba, trabajarás con servicios de AWS para resolver problemas reales de infraestructura, monitoreo y optimización de costos.

La prueba está dividida en dos partes principales que evaluarán:
- **Parte 1 - Preguntas técnicas**: Monitoreo, alertas y FinOps (10 minutos)
- **Parte 2 - Caso de uso**: Troubleshooting e investigación de problemas de latencia (40 minutos)

---

## 🔐 Credenciales de AWS

Para acceder al ambiente de pruebas, utiliza las siguientes credenciales:

```
Username: Tests
Password: Ask for Interviewer
Sign in URL: https://shippifydev.signin.aws.amazon.com/console
```

**Nota**: El entrevistador te proporcionará la contraseña al inicio de la prueba.

---

## 🔹 PARTE 1: Preguntas Técnicas (10 minutos)

### 1. **Alarmas de disponibilidad y latencia (5 min)**

**Objetivo**: Configurar alarmas en CloudWatch para monitorear la salud de la aplicación.

**Tareas**:
- Crear alarmas en CloudWatch para:
  - a) `5XXError` del `ALB` (Application Load Balancer)
  - b) `TargetResponseTime p95` (percentil 95 del tiempo de respuesta)
- Configurar el envío de notificaciones al SNS: `dev-topic`

---

### 2. **FinOps (5 min)**

**Objetivo**: Proponer estrategias para reducir costos operativos en AWS.

**Contexto**: 
Se han identificado dos costos elevados en el último mes:

1. **Almacenamiento histórico de objetos S3**: $1000 mensuales
2. **Almacenamiento de logs en CloudWatch**: $500 mensuales (Data retention - nivel de logs)

**Tareas**:
- Para cada uno de estos costos, propón una estrategia de solución

---

## 🔹 PARTE 2: Caso de Uso (40 minutos)

### Ambiente de Pruebas

```
- Región: sa-east-1
- Lambda: lambda-function-test-infra-stg-testSlowLambda-r1
- API Gateway: Slow Lambda Test API
- DynamoDB Table: slow-lambda-test-table
```

---

### ⚙️ Caso 1: Lambda con latencia intermitente — *Throttling o cold starts*

#### Contexto

El equipo de desarrollo reporta que un endpoint de **API Gateway + Lambda** está tardando más de 5 segundos en responder, pero **no todo el tiempo**. La Lambda accede a una **tabla DynamoDB** para realizar operaciones.

#### Tareas

1. **Investigación del problema** (15 min)
   - Investiga la causa del problema

2. **Instrumentación y monitoreo** (10 min)
   - Implementa instrumentación o métricas para detectar este problema automáticamente en el futuro

3. **Solución sin downtime** (15 min)
   - Si se identifica que el problema viene de DynamoDB, implementa una solución sin downtime

---

## 📋 Criterios de Evaluación

- **Monitoreo**: Capacidad para configurar alarmas efectivas y relevantes
- **FinOps**: Comprensión de estrategias de optimización de costos en AWS
- **Troubleshooting**: Metodología sistemática para investigar problemas
- **Solución**: Capacidad para proponer soluciones prácticas sin impacto en producción
- **Comunicación**: Claridad en la explicación de procesos y decisiones

---

## ⏱️ Tiempo Total Estimado

- Parte 1: 10 minutos
- Parte 2: 40 minutos
- **Total: 50 minutos**

---

## 📝 Notas Importantes

- Puedes usar internet para consultar información que no conozcas, pero no para resolver todo el problema
- **No está permitido el uso de IA** (ChatGPT, Copilot, etc.)
- El trabajo debe ser práctico, no se requiere documentación escrita
- Si tienes dudas sobre el ambiente o recursos, puedes preguntar al entrevistador

¡Buena suerte!
