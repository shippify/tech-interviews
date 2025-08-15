## Simulador de Correspondência Motorista–Entrega

# Teste Técnico – Jr Backend

### Contexto

Neste teste, você irá simular uma **tarefa real de backend** na Shippify.

A equipe de operações está enfrentando uma **emergência**:

O sistema de correspondência caiu durante o final de semana, deixando **centenas de entregas** sem motorista atribuído.

Sua missão é **simular** o sistema de correspondência motorista–entrega para que os despachantes possam continuar trabalhando enquanto o serviço principal é corrigido.

---

## Objetivo

Criar um **endpoint POST em Express.js** no Node.js que execute o seguinte:

1. **Receber dados de entrada** via **requisição HTTP POST** contendo:

   * Uma lista de **motoristas** (ID, coordenadas e entregas completadas).
   * Uma lista de **entregas** (ID e coordenadas).
2. **Para cada entrega**, atribuir o motorista disponível mais próximo.
3. Cada motorista pode pegar **apenas uma** entrega.
4. Se não houver motorista disponível para uma entrega, marque-a como **não atribuída**.
5. Retornar:

   * Uma lista de atribuições incluindo **distância em km** (arredondada para 2 casas decimais).
   * Uma lista de **entregas não atribuídas**.
   * Uma lista de **motoristas não utilizados**.

---

### Exemplo de Entrada

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

### Saída Esperada

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

### Regras

* As distâncias devem ser calculadas usando a **fórmula de Haversine**.

* Se `drivers` ou `shipments` estiver vazio, retornar um erro.

* **Regra de justiça:**

  Se dois motoristas estiverem exatamente à mesma distância de uma entrega, atribua ao que tiver **menos entregas completadas** (`deliveriesCompleted`).

* A lista `assignments` deve ser **ordenada pela menor distância primeiro**.

---

### Extras Opcionais (Pontos Bônus)

* Aceitar um parâmetro `maxDistanceKm` para ignorar entregas muito distantes de qualquer motorista.
* Retornar a **distância total** percorrida por todos os motoristas atribuídos.

---

## Arquivos Fornecidos

O repositório que você irá forkear contém:

* `index.js` → Endpoint Express inicial (lógica não implementada).

## Submissão

1. **Fork** do repositório original no GitHub: [**`https://github.com/shippify/tech-interviews/backend-jr-challenge`**](https://www.notion.so/Backend-30-mins-24912304bb2e8095aea9ce0a14f55af5?pvs=21)
2. Clone seu fork na sua máquina local e implemente a lógica de correspondência no `index.js` fornecido.
3. Faça commit das suas alterações.
4. Envie seu código para o repositório forkado no GitHub.
5. Abra um **Pull Request (PR)** do seu fork para o repositório original.
6. Na descrição do PR, inclua quaisquer notas ou explicações sobre sua implementação.

---

### Critérios de Avaliação

* Lógica de correspondência correta e eficiente.
* Código limpo, modular e legível.
* Tratamento adequado de operações assíncronas (se utilizadas).
* Validação de entrada e tratamento de erros.
* Formato de saída claro e consistente.
* Boa estrutura do repositório e documentação.
