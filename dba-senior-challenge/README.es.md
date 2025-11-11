# Prueba Técnica – DBA Senior

## Descripción General

Esta prueba técnica está diseñada para evaluar tus habilidades como **Database Administrator (DBA) Senior** en Shippify. Durante esta prueba, trabajarás con MySQL, AWS y optimización de bases de datos para resolver problemas reales de rendimiento y modelado.

La prueba está dividida en dos partes principales que evaluarán:
- **Parte 1 - Preguntas técnicas**: Configuración de ambiente e instalación (10 minutos)
- **Parte 2 - Casos prácticos**: Optimización de queries y modelado de datos (40 minutos)

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

### 1. **Configuración de Ambiente EC2 y MySQL**

**Objetivo**: Verificar capacidad de trabajar con AWS, Linux y MySQL.

**Tareas**:
- Crear una instancia EC2
- Instalar MySQL 8
- Conectarse a MySQL vía terminal
- Realizar una conexión local de prueba

**Instrucciones Básicas**:
- **Región**: sa-east-1
- Crear un **Key Pair** para acceso SSH a la instancia
- Usar el **VPC por defecto**: `vpc-55f72333 | Default VPC`
- Crear un **Security Group** con las siguientes reglas:
  - SSH (puerto 22) - acceso desde tu IP o 0.0.0.0/0
  - MySQL (puerto 3306) - acceso desde tu IP o 0.0.0.0/0
- Usar una **imagen Free Tier** (Amazon Linux 2 o Ubuntu) con tipo de instancia mínima (ej: t2.micro o t3.micro)
- Conectarse a la instancia vía SSH usando el Key Pair creado
- Instalar MySQL 8 en la instancia
- Configurar MySQL para aceptar conexiones remotas y crear un usuario de prueba
- Probar la conexión a MySQL localmente en la instancia

**Nota**: Puedes usar internet para consultar información sobre instalación y configuración.

---

## 🔹 PARTE 2: Casos Prácticos (40 minutos)

### **📊 CASO 1: Diagnóstico de Query Lento (15 minutos)**

#### Ambiente

**Credenciales**

```
- Acceso a consola MySQL dev
- Usuario: test
- Password: Ask for Interviewer
- Host: db.dev.shippify.co
- Esquema: test
```

**Nota**: El entrevistador te proporcionará la contraseña al inicio de la prueba.

**Ambiente**

```
Esquema: test
Tablas: delivery, shipper, company
```

#### Contexto

Se reporta que una consulta crítica para finanzas está disminuyendo el rendimiento del sistema.

La consulta calcula las **comisiones de los conductores** por semana y empresa, considerando solo las **entregas completadas** con un **monto mínimo** y **empresas activas**.

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

#### Información del Entorno

- Tabla `delivery`: 5 millones de registros
- Tabla `company`: 50 registros
- Tabla `shipper`: 300 registros
- La consulta tarda entre 5-20 segundos dependiendo del intervalo de tiempo

#### Tareas

1. **Análisis y optimización** (8 min):
   - Diagnosticar el problema
   - Proponer estrategias para resolver el problema
   - Explicar cómo implementarías la estrategia en producción sin downtime

2. **Validación** (2 min):
   - ¿Qué métrica usarías para validar que la optimización funcionó?

**Desafío**: Mejorar tiempo de respuesta y justificar cambios.

---

### **🏗️ CASO 2: Modelado de Datos (25 minutos)**

#### Contexto

Shippify gestiona miles de entregas diarias para distintas **empresas**. Cada **empresa** crea entregas que son ejecutadas por **drivers (conductores)**.

Cada **driver** puede operar en **una o más zonas**, definidas geográficamente, y puede cambiar de zona según el día o la operación.

Actualmente, toda esta información se almacena en una sola tabla `deliveries`, con campos JSON como `driver`, `zone`, `location` y `events`.

Esto ha generado problemas de rendimiento y dificultad para hacer consultas geoespaciales o reportes.

#### Requisitos Funcionales

- Una **empresa** puede crear muchas **entregas**
- Un **conductor** puede tener **múltiples zonas de operación**
- Una **entrega** siempre pertenece a **un shipper** y se realiza **dentro de una sola zona**
- Las **zonas** deben poder permitir búsquedas espaciales
- Cada cambio de estado de una entrega debe poder ser **guardado históricamente**

#### Estados de las Entregas

Las entregas pasan por los siguientes estados durante su ciclo de vida:

- **ASSIGNED**: La entrega fue asignada a un conductor, pero aún no ha sido iniciada
- **IN_TRANSIT**: El conductor está en camino para recoger o entregar el pedido
- **PICKED_UP**: El pedido fue recogido por el conductor
- **DELIVERED**: La entrega fue completada exitosamente
- **FAILED**: La entrega falló (no se pudo completar)

#### Consultas Necesarias

El nuevo modelo debe responder a las siguientes preguntas de forma eficiente:

1. **¿Cómo obtener todas las entregas completadas en una zona específica entre dos fechas?**

2. **¿Cómo obtener todas las entregas activas de un conductor específico?**

3. **¿Cómo calcular el rendimiento (tasa de éxito) por zona?**

#### Tareas

1. **Diseño del esquema**:
   - Propón la estructura de las tablas principales (campos clave y tipos de datos)
   - Define índices estratégicos que optimicen las consultas requeridas: índices, claves primarias, tipos de datos

2. **Arquitectura**:
   - ¿Usarías solo MySQL o combinarías con otros sistemas de base de datos? Justifica tu decisión
   - ¿Cómo manejarías 10M escrituras/día sin saturar MySQL?

---

## 📋 Criterios de Evaluación

- **Troubleshooting**: Metodología sistemática para diagnosticar problemas de rendimiento
- **Optimización**: Capacidad para identificar y resolver cuellos de botella en queries
- **Modelado**: Habilidad para diseñar esquemas eficientes y escalables
- **Arquitectura**: Comprensión de trade-offs y decisiones técnicas
- **Implementación**: Capacidad para proponer cambios seguros sin downtime

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

