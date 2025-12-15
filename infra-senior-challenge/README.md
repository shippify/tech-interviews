# Teste Técnico – SRE Sênior

## Descrição Geral

Este teste técnico foi projetado para avaliar suas habilidades como **Infrastructure Engineer Sênior** na Shippify. Durante este teste, você trabalhará com serviços da AWS para resolver problemas reais de infraestrutura, monitoramento e otimização de custos.

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

## 🔹 PARTE 2: Caso de Uso (40 minutos)

### Ambiente de Testes

```
- Região: sa-east-1
- ECS Cluster: shippify-server-dev
- ELB: services-internal-lb
```

---

### ⚙️ Caso : ECS Fargate Cluster Traffic Configuration 

#### Contexto

O time de plataforma precisa **desacoplar o fluxo de finalização de entregas** para um **novo serviço em ECS Fargate**.

Atualmente, as requisições para o endpoint de conclusão de entregas são atendidas por um serviço legado.  
O objetivo é **criar um novo serviço em Fargate** e **rotear apenas o tráfego** que corresponde ao path:

/v1/deliveries/*/complete


O serviço deve ser criado no cluster ECS: shippify-server-dev


O **serviço estará inicialmente desligado**, portanto será necessário **ligá-lo para observar o tráfego real**.

---

#### Endpoint para Teste

```http
GET https://api.dev.shippify.co/v1/deliveries/:id/complete


Durante os testes, o tráfego deve ser visível chegando ao novo serviço.

### Tarefas

- Criação do serviço ECS Fargate (15 min)

- Criar um novo serviço Fargate no cluster shippify-server-dev

- Configurar logs no CloudWatch

Co- nfiguração de roteamento no Load Balancer (10 min)

- Criar uma nova regra no Application Load Balancer

- Roteamento do path /v1/deliveries/*/complete para o novo serviço

- Ativação do serviço e validação do tráfego (10 min)

- Explicar quais métricas e alarmes seriam adicionados para produção

Restrições

Não deve haver downtime para outros endpoints

O roteamento deve afetar somente o path especificado

O foco é validar tráfego real, não apenas configuração

📋 Critérios de Avaliação

ECS / Fargate: Criação e configuração corretas do serviço

Load Balancer: Uso adequado de regras de roteamento por path

Observabilidade: Uso eficaz de logs e métricas no CloudWatch

Troubleshooting: Capacidade de validar e confirmar o fluxo de tráfego

Comunicação: Clareza na explicação das decisões e validações

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
