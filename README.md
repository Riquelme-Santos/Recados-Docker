📬 Recados Docker

Aplicação web de gerenciamento de recados, desenvolvida com uma arquitetura baseada em containers Docker.

O projeto utiliza Docker Compose para orquestrar três serviços independentes: frontend, backend e banco de dados MySQL. Essa estrutura facilita a configuração, execução e distribuição da aplicação em diferentes ambientes.

🏗️ Arquitetura

A aplicação é composta pelos seguintes serviços:

Frontend — Servido através do Nginx na porta 8080.
Backend — API desenvolvida em Node.js, disponibilizada na porta 3000.
Banco de dados — MySQL 8.0, responsável pelo armazenamento dos recados.
Docker Network — Os containers se comunicam através da rede rede-recados.
Docker Volume — Os dados do MySQL são persistidos através do volume dados_recados.
Estrutura do projeto

Recados-Docker/

│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── banco/
│   └── init.sql
│
├── frontend/
│   ├── Dockerfile
│   └── ...
│
└── docker-compose.yml

🐳 Containers
Frontend

O frontend utiliza a imagem nginx:alpine para servir os arquivos da aplicação web.

front:
  build: ./frontend
  container_name: front-recados
  ports:
    - "8080:80"


A aplicação pode ser acessada através de:

http://localhost:8080

Backend

O backend utiliza Node.js 20 e é executado dentro de um container Docker.

back:
  build: ./backend
  container_name: back-recados
  ports:
    - "3000:3000"


A API fica disponível em:

http://localhost:3000


O container do backend também possui uma dependência do serviço de banco de dados.

🗄️ Banco de dados

O projeto utiliza MySQL 8.0.

banco:
  image: mysql:8.0
  container_name: banco-recados


O banco utilizado pela aplicação é:

recados


A senha do usuário root configurada no ambiente de desenvolvimento é:

123456


⚠️ Em ambientes de produção, recomenda-se utilizar variáveis de ambiente ou Docker Secrets em vez de deixar credenciais diretamente no arquivo docker-compose.yml.

O projeto também utiliza o arquivo banco/init.sql para inicializar o banco de dados.

🌐 Rede Docker

Os três containers são conectados à mesma rede:

rede-recados


Isso permite que os serviços se comuniquem entre si utilizando os nomes dos containers como referência.

Frontend
   │
   ├── rede-recados
   │
Backend
   │
   ├── rede-recados
   │
MySQL

💾 Persistência dos dados

Os dados do MySQL são armazenados em um Docker Volume:

dados_recados


O volume é montado no diretório:

/var/lib/mysql


Dessa forma, os dados do banco não ficam dependentes exclusivamente do ciclo de vida do container.

🚀 Como executar o projeto
Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

Docker
Docker Compose
1. Clone o repositório
git clone https://github.com/Riquelme-Santos/Recados-Docker.git


Entre na pasta do projeto:

cd Recados-Docker

2. Construa e execute os containers

Execute:

docker compose up -d --build


Esse comando irá:

construir a imagem do frontend;
construir a imagem do backend;
baixar a imagem do MySQL;
criar os containers;
criar a rede Docker;
criar o volume do banco;
iniciar todos os serviços.
3. Verifique os containers
docker compose ps


Os containers esperados são:

front-recados
back-recados
banco-recados

4. Acesse a aplicação

Frontend:

http://localhost:8080


Backend:

http://localhost:3000

🛑 Parando a aplicação

Para parar os containers:

docker compose down


Para parar os containers e remover também o volume do banco:

docker compose down -v


⚠️ O comando docker compose down -v remove o volume dados_recados e, consequentemente, os dados persistidos do banco.

📋 Comandos úteis
Ver os containers
docker compose ps

Visualizar os logs
docker compose logs

Visualizar os logs em tempo real
docker compose logs -f

Ver os logs apenas do backend
docker compose logs -f back

Ver os logs apenas do banco
docker compose logs -f banco

Reiniciar os serviços
docker compose restart

Recriar as imagens
docker compose up -d --build

🛠️ Tecnologias utilizadas
Docker
Docker Compose
Node.js 20
Nginx Alpine
MySQL 8.0
HTML / CSS / JavaScript
API REST
🎯 Objetivo do projeto

O projeto foi desenvolvido com o objetivo de demonstrar, na prática, a utilização do Docker para containerização e gerenciamento de uma aplicação composta por múltiplos serviços.

Através do Docker Compose, frontend, backend e banco de dados podem ser executados de forma integrada, utilizando uma rede privada entre os containers e persistência dos dados do banco.

📌 Fluxo da aplicação

                    ┌─────────────────────┐
                    │       Usuário       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Frontend       │
                    │   Nginx :8080       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Backend       │
                    │    Node.js :3000    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       MySQL         │
                    │        :3306        │
                    └─────────────────────┘

                    Rede: rede-recados

👨‍💻 Autor

Riquelme Santos

GitHub: Riquelme-Santos

⭐ Se este projeto foi útil para você, considere deixar uma estrela no repositório!
