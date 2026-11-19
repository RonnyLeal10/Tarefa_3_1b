# Tarefa 3.1 b) — Animalec: Gestão de Patrocinadores e Especialistas

## 1. Enquadramento

**Unidade Curricular:** Programação Web Avançada  
**Curso:** Mestrado em Engenharia Informática e Tecnologia Web  
**Projeto:** Animalec — Extensão do Back-office

Este trabalho tem como objetivo estender a aplicação Animalec, apresentada no livro Desenvolvimento avançado para a Web: Do front-end ao back-end, de Portela e Queirós (2020).

A proposta passa por acrescentar duas entidades novas à área administrativa da aplicação, os Patrocinadores e os Especialistas, mantendo a identidade visual e a arquitetura do projeto original.

O trabalho inclui o desenho da interface e a implementação das operações de gestão destas novas entidades.

## 2. Objetivos

Os principais objetivos são:

- Integrar duas novas entidades no back-office do Animalec.
- Permitir consultar, adicionar, editar e remover registos.
- Associar especialistas a grupos de animais.
- Manter uma interface coerente com o Animalec original.
- Utilizar uma arquitetura frontend/backend com comunicação através de API REST.
- Garantir a possibilidade de executar o projeto num ambiente local.

## 3. Entidades desenvolvidas

### 3.1. Patrocinadores

A entidade Patrocinador representa pessoas ou organizações que apoiam a aplicação e os animais nela apresentados.

As operações previstas são:

- Listagem de patrocinadores.
- Adição de novos patrocinadores.
- Consulta dos dados.
- Edição de registos existentes.
- Remoção de patrocinadores.

### 3.2. Especialistas

A entidade Especialista representa profissionais com conhecimentos específicos sobre determinados grupos de animais.

As operações previstas são:

- Listagem de especialistas.
- Adição de novos especialistas.
- Consulta dos dados.
- Edição de registos existentes.
- Remoção de especialistas.
- Associação de especialistas a grupos de animais.

No formulário de especialistas, a seleção do grupo de animais permite identificar a área de especialização de cada profissional.

**Estado atual:** a interface dos especialistas encontra-se implementada, mas a integração com a API ainda necessita de validação. Foi identificado um erro HTTP 404 na rota `/experts`.

## 4. Tecnologias utilizadas

| Componente | Tecnologia |
|---|---|
| Frontend | Vue.js 2 |
| Interface | Bootstrap / BootstrapVue |
| Gestão de estado | Vuex |
| Navegação | Vue Router |
| Backend | Node.js |
| API | Express.js |
| Base de dados | MongoDB |
| Modelação de dados | Mongoose |
| Comunicação | HTTP / API REST |
| Controlo de versões | Git e GitHub |

## 5. Estrutura do projeto

O projeto está organizado em duas componentes principais:

```text
Animalec/
├── Front-end_Animalec-master/
│   ├── src/
│   │   ├── views/
│   │   │   └── Tarefa_b/
│   │   ├── router/
│   │   ├── store/
│   │   └── api/
│   └── package.json
│
├── Back-end_fca_webbook2-master/
│   └── fca_webbook2-master/
│       ├── app.js
│       ├── node-compat.js
│       ├── Tarefa_b/
│       │   └── routes/
│       ├── package.json
│       └── package-lock.json
│
└── README.md
```

Esta estrutura representa a organização utilizada no desenvolvimento. Os nomes e caminhos devem corresponder aos ficheiros efetivamente publicados no repositório.

## 6. Instalação e execução

### 6.1. Requisitos

Para executar a aplicação, são necessários:

- Node.js e npm.
- MongoDB em funcionamento.
- Um terminal, como o PowerShell ou o terminal integrado do Visual Studio Code.

O frontend foi iniciado num ambiente com Node.js 26.13.1. O backend utiliza uma correção de compatibilidade para uma dependência antiga.

### 6.2. Iniciar o frontend

Abrir um terminal na pasta:

```powershell
cd Front-end_Animalec-master
```

Instalar as dependências:

```powershell
npm install
```

Iniciar o servidor de desenvolvimento:

```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"; npm run serve
```

Após a compilação, abrir no navegador o endereço apresentado no terminal, normalmente:

```text
http://localhost:8080
```

O parâmetro `--openssl-legacy-provider` é utilizado devido à compatibilidade entre o Webpack antigo e versões recentes do Node.js.

### 6.3. Iniciar o MongoDB

Antes de iniciar o backend, garantir que o serviço MongoDB está em funcionamento.

A configuração local utilizada é:

```text
mongodb://localhost:27017/animalec
```

A base de dados utilizada chama-se `animalec`.

### 6.4. Iniciar o backend

Abrir **um segundo terminal**, mantendo o frontend em execução.

Aceder à pasta do backend:

```powershell
cd Back-end_fca_webbook2-master\fca_webbook2-master
```

Instalar as dependências:

```powershell
npm install
```

O projeto utiliza um ficheiro `node-compat.js` para contornar uma incompatibilidade de uma dependência antiga com o Node.js 26.

O conteúdo desse ficheiro é:

```javascript
const buffer = require('node:buffer');

if (!buffer.SlowBuffer) {
  buffer.SlowBuffer = buffer.Buffer;
}
```

Para iniciar o backend com essa correção:

```powershell
node --require ./node-compat.js app.js
```

**Importante:** o comando anterior foi testado até à fase de inicialização da aplicação e ligação ao MongoDB. O teste terminou com a porta 8080 ocupada por outro processo, pelo que o arranque completo ainda necessita de confirmação.

Para permitir que o professor utilize simplesmente `npm start`, o script `start` do `package.json` do backend deverá ser configurado da seguinte forma:

```json
"scripts": {
  "start": "node --require ./node-compat.js app.js"
}
```

Depois de guardar essa alteração, o comando de arranque será:

```powershell
npm start
```

A correção deverá ser incluída no GitHub juntamente com o `package.json` e o `package-lock.json`.

### 6.5. Atenção às portas

O frontend e o backend não podem utilizar a mesma porta no mesmo computador.

Nos testes, foi identificado um conflito na porta `8080`. É necessário configurar portas distintas para os dois servidores e confirmar que o frontend utiliza o endereço correto da API.

## 7. Implementação

### 7.1. Frontend

O frontend segue a estrutura do projeto Animalec original, utilizando componentes Vue para apresentar as páginas e formulários.

As novas interfaces de gestão permitem organizar a informação em tabelas e disponibilizar ações de consulta e manutenção dos registos.

### 7.2. Backend

O backend utiliza Express.js para disponibilizar os serviços HTTP e Mongoose para comunicar com o MongoDB.

A rota dos patrocinadores encontra-se registada na configuração do servidor:

```javascript
app.use('/sponsors', require('../Tarefa_b/routes/sponsor.routes'));
```

Para disponibilizar os especialistas através de `/experts`, será necessário confirmar a existência do ficheiro de rotas correspondente e registá-lo na configuração do Express.
### 7.3 Diagrama de funcionamento
img width="1388" height="1990" alt="Diagrama de comunicação" src="https://github.com/user-attachments/assets/295e52b4-f838-40f2-8aaa-dc5effeda01f" /

### 7.4. Compatibilidade

Durante o desenvolvimento, foram identificadas incompatibilidades entre algumas dependências antigas do backend e o Node.js 26.

Foi introduzido um ficheiro de compatibilidade que permite ultrapassar o erro relacionado com `SlowBuffer`.

Esta solução deve ser validada através de testes às funcionalidades, especialmente à autenticação.

## 8. Testes e estado do desenvolvimento

| Funcionalidade | Estado |
|---|---|
| Compilação do frontend | Confirmada, com avisos de formatação |
| Ligação ao MongoDB | Confirmada |
| Correção do erro `SlowBuffer` | Confirmada no teste de arranque |
| Inicialização completa do backend | Pendente de confirmação |
| Interface de gestão de especialistas | Implementada |
| Listagem de especialistas pela API | Erro 404 identificado |
| Adição de especialistas pela API | Pendente de correção e teste |
| Operações de patrocinadores | Pendente de validação completa |
| Compatibilidade da autenticação | Pendente de teste |


## 9. Referências

Portela, F., & Queirós, R. (2020). *Desenvolvimento avançado para a Web: Do front-end ao back-end*. FCA.

Vue.js. *Vue 2 Guide*. https://v2.vuejs.org/v2/guide/

Express.js. *Express Documentation*. https://expressjs.com/

MongoDB. *MongoDB Documentation*. https://www.mongodb.com/docs/

Node.js. *Node.js Documentation*. https://nodejs.org/

NVM. *NVM Node Version Manager* https://www.nvmnode.com/
