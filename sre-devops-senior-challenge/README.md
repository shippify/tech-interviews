# Teste Técnico – SRE/DEVOPS Sênior

## Descrição Geral

Este teste técnico foi projetado para avaliar suas habilidades como **Site Reliability Engineer (SRE/DEVOPS) Sênior** na Shippify. Durante este teste, você trabalhará com serviços da AWS para resolver problemas reais de infraestrutura, monitoramento e otimização de custos.

O teste está dividido em duas partes principais que avaliarão:
- **Parte 1 - Perguntas técnicas**: Monitoramento, alertas e FinOps (10 minutos)
- **Parte 2 - Caso de uso**: Troubleshooting e investigação de problemas de latência (40 minutos)

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

### 1. **Alarmes de disponibilidade e latência (5 min)**

**Objetivo**: Configurar alarmes no CloudWatch para monitorar a saúde da aplicação.

**Tarefas**:
- Criar alarmes no CloudWatch para:
  - a) `5XXError` do `ALB` (Application Load Balancer)
  - b) `TargetResponseTime p95` (percentil 95 do tempo de resposta)
- Configurar o envio de notificações para o SNS: `dev-topic`

---

### 2. **FinOps (5 min)**

**Objetivo**: Propor estratégias para reduzir custos operacionais na AWS.

**Contexto**: 
Foram identificados dois custos elevados no último mês:

1. **Armazenamento histórico de objetos S3**: $1000 mensais
2. **Armazenamento de logs no CloudWatch**: $500 mensais

**Tarefas**:
- Para cada um desses custos, proponha uma estratégia de solução

---

## 🔹 PARTE 2: Caso de Uso (40 minutos)

### Ambiente de Testes

```
- Região: sa-east-1
- Lambda: lambda-function-test-infra-stg-testSlowLambda-r1
- API Gateway: Slow Lambda Test API
- DynamoDB Table: slow-lambda-test-table
```

---

### ⚙️ Caso 1: Lambda com latência intermitente — *Throttling ou cold starts*

#### Contexto

A equipe de desenvolvimento reportou no dia **10 de novembro** que um endpoint de **API Gateway + Lambda** está demorando mais de 5 segundos para responder, mas **não o tempo todo**. A Lambda acessa uma **tabela DynamoDB** para realizar operações.

**Você deve revisar as métricas históricas desde o dia 10 de novembro** para investigar o problema e testar o endpoint novamente para ver o funcionamento atual.

#### Endpoint para Testar

```bash
curl --location 'https://fmd35obzgb.execute-api.sa-east-1.amazonaws.com/dev/test'
```

#### Resposta de Exemplo

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

#### Tarefas

1. **Investigação do problema** (15 min)
   - Investigue a causa do problema

2. **Instrumentação e monitoramento** (10 min)
   - Implemente instrumentação ou métricas para detectar este problema automaticamente no futuro

3. **Solução sem downtime** (15 min)
   - Se for identificado que o problema vem do DynamoDB, implemente uma solução sem downtime

---

## 📋 Critérios de Avaliação

- **Monitoramento**: Capacidade de configurar alarmes efetivos e relevantes
- **FinOps**: Compreensão de estratégias de otimização de custos na AWS
- **Troubleshooting**: Metodologia sistemática para investigar problemas
- **Solução**: Capacidade de propor soluções práticas sem impacto em produção
- **Comunicação**: Clareza na explicação de processos e decisões

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
