# Teste Técnico – DBA Sênior

## Descrição Geral

Este teste técnico foi projetado para avaliar suas habilidades como **Database Administrator (DBA) Sênior** na Shippify. Durante este teste, você trabalhará com MySQL, AWS e otimização de bancos de dados para resolver problemas reais de desempenho e modelagem.

O teste está dividido em duas partes principais que avaliarão:
- **Parte 1 - Perguntas técnicas**: Configuração de ambiente e instalação (10 minutos)
- **Parte 2 - Casos práticos**: Otimização de queries e modelagem de dados (40 minutos)

---

## 🔐 Credenciais AWS

Para acessar o ambiente de testes, utilize as seguintes credenciais:

```
Username: Tests
Password: Ask for Interviewer
Sign in URL: https://shippifydev.signin.aws.amazon.com/console
```

**Nota**: O entrevistador fornecerá a senha no início do teste.

---

## 🔹 PARTE 1: Perguntas Técnicas (10 minutos)

### 1. **Configuração de Ambiente EC2 e MySQL**

**Objetivo**: Verificar capacidade de trabalhar com AWS, Linux e MySQL.

**Tarefas**:
- Criar uma instância EC2
- Instalar MySQL 8
- Conectar-se ao MySQL via terminal
- Realizar uma conexão local de teste

**Instruções Básicas**:
- **Região**: sa-east-1
- Criar um **Key Pair** para acesso SSH à instância
- Usar o **VPC padrão**: `vpc-55f72333 | Default VPC`
- Criar um **Security Group** com as seguintes regras:
  - SSH (porta 22) - acesso do seu IP ou 0.0.0.0/0
  - MySQL (porta 3306) - acesso do seu IP ou 0.0.0.0/0
- Usar uma **imagem Free Tier** (Amazon Linux 2 ou Ubuntu) com tipo de instância mínima (ex: t2.micro ou t3.micro)
- Conectar-se à instância via SSH usando o Key Pair criado
- Instalar MySQL 8 na instância
- Configurar o MySQL para aceitar conexões remotas e criar um usuário de teste
- Testar a conexão ao MySQL localmente na instância

**Nota**: Você pode usar a internet para consultar informações sobre instalação e configuração.

---

## 🔹 PARTE 2: Casos Práticos (40 minutos)

### **📊 CASO 1: Diagnóstico de Query Lento (15 minutos)**

#### Ambiente

**Credenciais**

```
- Acesso à console MySQL dev
- Usuário: test
- Senha: Ask for Interviewer
- Host: db.dev.shippify.co
- Esquema: test
```

**Nota**: O entrevistador fornecerá a senha no início do teste.

**Ambiente**

```
Esquema: test
Tabelas: delivery, shipper, company
```

#### Contexto

Foi reportado que uma consulta crítica para finanças está diminuindo o desempenho do sistema.

A consulta calcula as **comissões dos condutores** por semana e empresa, considerando apenas as **entregas completadas** com um **valor mínimo** e **empresas ativas**.

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

#### Informações do Ambiente

- Tabela `delivery`: 5 milhões de registros
- Tabela `company`: 50 registros
- Tabela `shipper`: 300 registros
- A consulta leva entre 5-20 segundos dependendo do intervalo de tempo

#### Tarefas

1. **Análise e otimização** (8 min):
   - Diagnosticar o problema
   - Propor estratégias para resolver o problema
   - Explicar como implementaria a estratégia em produção sem downtime

2. **Validação** (2 min):
   - Que métrica usaria para validar que a otimização funcionou?

**Desafio**: Melhorar o tempo de resposta e justificar as mudanças.

---

### **🏗️ CASO 2: Modelagem de Dados (25 minutos)**

#### Contexto

A Shippify gerencia milhares de entregas diárias para diferentes **empresas**. Cada **empresa** cria entregas que são executadas por **drivers (condutores)**.

Cada **driver** pode operar em **uma ou mais zonas**, definidas geograficamente, e pode mudar de zona conforme o dia ou a operação.

Atualmente, toda essa informação é armazenada em uma única tabela `deliveries`, com campos JSON como `driver`, `zone`, `location` e `events`.

Isso tem gerado problemas de desempenho e dificuldade para fazer consultas geoespaciais ou relatórios.

#### Requisitos Funcionais

- Uma **empresa** pode criar muitas **entregas**
- Um **condutor** pode ter **múltiplas zonas de operação**
- Uma **entrega** sempre pertence a **um shipper** e é realizada **dentro de uma única zona**
- As **zonas** devem permitir buscas espaciais
- Cada mudança de estado de uma entrega deve poder ser **salva historicamente**

#### Estados das Entregas

As entregas passam pelos seguintes estados durante seu ciclo de vida:

- **ASSIGNED**: Entrega foi atribuída a um condutor, mas ainda não foi iniciada
- **IN_TRANSIT**: Condutor está a caminho para buscar ou entregar o pedido
- **PICKED_UP**: Pedido foi coletado pelo condutor
- **DELIVERED**: Entrega foi completada com sucesso
- **FAILED**: Entrega falhou (não foi possível completar)

#### Consultas Necessárias

O novo modelo deve responder às seguintes perguntas de forma eficiente:

1. **Como obter todas as entregas completadas em uma zona específica entre duas datas?**

2. **Como obter todas as entregas ativas de um condutor específico?**

3. **Como calcular o desempenho (taxa de sucesso) por zona?**

#### Tarefas

1. **Design do esquema**:
   - Proponha a estrutura das tabelas principais (campos-chave e tipos de dados)
   - Defina índices estratégicos que otimizem as consultas requeridas: índices, chaves primárias, tipos de dados

2. **Arquitetura**:
   - Usaria apenas MySQL ou combinaria com outros sistemas de banco de dados? Justifique sua decisão
   - Como lidaria com 10M escritas/dia sem saturar o MySQL?

---

## 📋 Critérios de Avaliação

- **Troubleshooting**: Metodologia sistemática para diagnosticar problemas de desempenho
- **Otimização**: Capacidade de identificar e resolver gargalos em queries
- **Modelagem**: Habilidade para projetar esquemas eficientes e escaláveis
- **Arquitetura**: Compreensão de trade-offs e decisões técnicas
- **Implementação**: Capacidade de propor mudanças seguras sem downtime

---

## ⏱️ Tempo Total Estimado

- Parte 1: 10 minutos
- Parte 2: 40 minutos
- **Total: 50 minutos**

---

## 📝 Notas Importantes

- Você pode usar a internet para consultar informações que não conheça, mas não para resolver todo o problema
- **Não é permitido o uso de IA** (ChatGPT, Copilot, etc.)
- O trabalho deve ser prático, não é necessária documentação escrita
- Se tiver dúvidas sobre o ambiente ou recursos, pode perguntar ao entrevistador

Boa sorte!
