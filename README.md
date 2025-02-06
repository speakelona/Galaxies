# Backend de Gerenciamento de Observatórios Astronômicos

## Sobre o Projeto

Este é um backend GraphQL construído com NestJS para gerenciar observatórios astronômicos, telescópios e observações. O projeto foi intencionalmente desenvolvido com diversas vulnerabilidades de segurança como parte de um desafio técnico.

## 🎯 Desafio de Segurança

Seu objetivo é:

1. Identificar as vulnerabilidades existentes no código
2. Documentar cada vulnerabilidade encontrada, incluindo:
   - Localização no código
   - Nível de criticidade
   - Potencial impacto
3. Propor e implementar soluções para cada vulnerabilidade identificada

## Como Participar do Desafio

1. Clique no botão "Use this template" no topo do repositório
2. Selecione "Create a new repository"
3. Mantenha seu repositório privado
4. Faça suas alterações identificando e corrigindo as vulnerabilidades
5. Quando finalizar, adicione `@RTS-Galaxies` como colaborador do seu repositório
6. Envie um email para o responsável da sua seleção com:
   - Link do seu repositório
   - Seu nome completo
   - Breve descrição das vulnerabilidades encontradas

## Requisitos

- Node.js >= 18
- MongoDB >= 4.4
- NPM ou Yarn

## Configuração

1. Clone o repositório:
```bash
git clone https://github.com/GalaxiesGG/backend-security-test.git
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Inicie o servidor:
```bash
npm run start:dev
```

## Estrutura do Projeto

O projeto está organizado nos seguintes módulos:

- `users`: Gerenciamento de usuários
- `auth`: Autenticação e autorização
- `observatories`: Gerenciamento de observatórios
- `telescopes`: Gerenciamento de telescópios
- `observations`: Registro de observações astronômicas

## Uso da API

### 1. Registro de Usuário

```graphql
mutation {
  createUser(createUserInput: {
    name: "Nome do Usuário"
    email: "usuario@exemplo.com"
    password: "senha123"
  }) {
    _id
    name
    email
  }
}
```

### 2. Login

```graphql
mutation {
  login(loginInput: {
    email: "usuario@exemplo.com"
    password: "senha123"
  }) {
    access_token
    user {
      _id
      name
      email
    }
  }
}
```

### 3. Criar Observatório

```graphql
mutation {
  createObservatory(createObservatoryInput: {
    name: "Observatório Exemplo"
    location: {
      latitude: -23.5505
      longitude: -46.6333
      altitude: 760
      address: "Endereço do Observatório"
      securityDetails: "Detalhes de segurança"
    }
    website: "https://observatorio.exemplo.com"
    description: "Descrição do observatório"
    securityCode: "123456"
  }) {
    _id
    name
  }
}
```

### 4. Adicionar Telescópio

```graphql
mutation {
  createTelescope(createTelescopeInput: {
    name: "Telescópio Principal"
    model: "Modelo XYZ"
    serialNumber: "123456789"
    observatoryId: "ID_DO_OBSERVATORIO"
    specifications: {
      aperture: 200
      focalLength: 2000
      mountType: "Equatorial"
      controlSystem: "Sistema de Controle"
      calibrationData: "Dados de Calibração"
    }
  }) {
    _id
    name
  }
}
```

### 5. Registrar Observação

```graphql
mutation {
  createObservation(createObservationInput: {
    telescopeId: "ID_DO_TELESCOPIO"
    startTime: "2024-03-15T20:00:00Z"
    endTime: "2024-03-15T22:00:00Z"
    target: "M31 - Galáxia de Andrômeda"
    coordinates: {
      rightAscension: "00h 42m 44.3s"
      declination: "+41° 16' 9''"
      epoch: "J2000"
    }
    weatherConditions: {
      temperature: 15.5
      humidity: 65
      visibility: 8
      notes: "Céu limpo"
    }
  }) {
    _id
    target
  }
}
```

## Notas Importantes

1. **Autenticação**: Para todas as operações (exceto registro e login), inclua o token JWT no header:
```
Authorization: Bearer seu_token_aqui
```

2. **GraphQL Playground**: Disponível em `http://localhost:3000/graphql`

## Queries Disponíveis

- `observatories`: Lista todos os observatórios
- `observatory(id: String!)`: Busca um observatório específico
- `telescopes`: Lista todos os telescópios
- `telescope(id: String!)`: Busca um telescópio específico
- `observations`: Lista todas as observações
- `observation(id: String!)`: Busca uma observação específica

## Mutations Disponíveis

- `createUser`: Registra um novo usuário
- `login`: Autentica um usuário
- `createObservatory`: Cria um novo observatório
- `updateObservatory`: Atualiza um observatório existente
- `removeObservatory`: Remove um observatório
- `createTelescope`: Cria um novo telescópio
- `updateTelescope`: Atualiza um telescópio existente
- `removeTelescope`: Remove um telescópio
- `createObservation`: Cria uma nova observação
- `updateObservation`: Atualiza uma observação existente
- `removeObservation`: Remove uma observação

## Suporte

Para dúvidas ou problemas, abra uma issue no repositório. 
