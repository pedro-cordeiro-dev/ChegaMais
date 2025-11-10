# 🚀 Chega+ (Projeto de Lazer)

Um **aplicativo móvel**, desenvolvido com **React Native (Expo)**, focado na descoberta, cadastro e avaliação de locais de lazer e entretenimento.  
Funciona como uma **plataforma social**, onde usuários podem compartilhar e descobrir novos pontos na sua cidade.

O app é totalmente **integrado com o Firebase** para autenticação, banco de dados em tempo real (**Firestore**) e armazenamento de imagens (**Storage**).

---

## ✨ Funcionalidades Principais

### 🔐 Autenticação Completa
- Cadastro de novos usuários  
- Login com email e senha  
- Recuperação de senha (com envio de link por email)

---

### 🏠 Tela Home (`TelaHome.js`)
- Carrosséis dinâmicos que buscam dados do Firestore:
  - **Recomendados:** Exibe os lazeres mais recentes  
  - **Mais Avaliados:** Exibe os lazeres com maior nota média (`rating`)  
  - **Mais Comentados:** Exibe os lazeres com maior número de avaliações (`totalReviews`)
- Filtro de lazeres por categoria (Lazer, Comida, Esportes, etc.)
- Navegação direta para o card de um lazer na **Tela Explorar**

---

### 🔎 Tela Explorar (`TelaExplorar.js`)
- Carrossel horizontal de todos os lazeres cadastrados  
- Barra de pesquisa funcional para filtrar locais pelo nome  
- Exibição detalhada de cada lazer, incluindo:
  - Status de funcionamento ("Aberto" / "Fechado") calculado em tempo real  
  - Endereço e nome de quem publicou  
  - Integração com **Google Maps** (botão “Como chegar”)

---

### ⭐ Sistema de Avaliação
- Modal para avaliar um local com 0–5 estrelas e um comentário  
- Cálculo automático da nova nota média e total de avaliações  
- Exibição dos **4 comentários mais recentes** (com foto e nome do usuário)

---

### ➕ Cadastro de Lazer (`TelaCadastrar.js`)
- Formulário completo para adicionar novos locais  
- Upload de imagem (usando **expo-image-picker**) para o Firebase Storage  
- Seleção de horário de funcionamento (**DateTimePicker nativo**)  
- Seleção de dias da semana  

---

### 👤 Perfil de Usuário (`Perfil.js`)
- Upload de foto de perfil (salva no Storage e atualiza o Firestore)  
- Alteração de senha (com reautenticação de segurança)  
- Link para “Meus Lazeres” e “Minhas Avaliações”

---

### 📄 Telas de Perfil (Dinâmicas)
- **TelaMeusLazeres.js:** Exibe os locais cadastrados pelo usuário logado, com botão **Editar** que abre um modal para alteração dos dados  
- **TelaAvaliacoes.js:** Lista todas as avaliações feitas pelo usuário logado, com filtro por nota  

---

## 🧠 Tecnologias Utilizadas

- **React Native**
- **Expo**
- **Firebase (v9+)**
  - Authentication (Autenticação)
  - Firestore (Banco de Dados)
  - Storage (Armazenamento de Imagens)
- **React Navigation (v6)**
- **expo-linear-gradient** (fundos degradê)
- **expo-image-picker** (upload de fotos)
- **@react-native-community/datetimepicker** (seletor de horário)

---

## 🔥 Configuração Obrigatória do Firebase (Índices)

Para que as consultas dinâmicas (filtros e ordenações) funcionem no Firestore, é **obrigatório criar os seguintes índices** no painel do Firebase:

### 📊 Índices da Home
| Nome | Coleção | Escopo | Campos |
|------|----------|--------|--------|
| **Mais Avaliados** | `lazer` | Coleta | `rating (desc)` |
| **Mais Comentados** | `lazer` | Coleta | `totalReviews (desc)` |
| **Filtro de Categoria** | `lazer` | Coleta | `categoria (asc)`, `createdAt (desc)` |

### 👤 Índices do Perfil
| Nome | Coleção / Escopo | Tipo | Campos |
|------|------------------|------|--------|
| **Meus Lazeres** | `lazer` | Coleta | `postedBy (asc)`, `createdAt (desc)` |
| **Minhas Avaliações** | Grupo de Coleções (`reviews`) | Grupo | `userId (asc)`, `createdAt (desc)` |

---

## 🏁 Como Rodar o Projeto

### 1️⃣ Clone o repositório:
```bash
git clone [URL-DO-SEU-REPOSITORIO]
cd [NOME-DA-PASTA]
```

### 2️⃣ Instale as dependências:
```bash
npm install
```

### 3️⃣ Instale as dependências específicas do Expo:
```bash
npx expo install expo-linear-gradient expo-image-picker @react-native-community/datetimepicker firebase
```

### 4️⃣ Configure o Firebase:
1. Crie um projeto no [Firebase Console](https://console.firebase.google.com)  
2. Ative os serviços de **Authentication**, **Firestore** e **Storage**  
3. Obtenha o seu objeto `firebaseConfig`  
4. Cole o `firebaseConfig` no arquivo `firebaseconfig.js`  
5. Crie os índices do Firestore (veja a seção acima)

### 5️⃣ Inicie o projeto:
```bash
npx expo start
```

---

