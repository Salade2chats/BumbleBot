# BumbleBot
Workplace ChatBot

## Installation

Clone the project

```sh
git clone https://github.com/Salade2chats/BumbleBot.git
cd BumbleBot
```

Create a **.env** from **.env.dist**

> :information_source: List of keys
> * **FB_TOKEN** Facebook bot Token
> * **FB_VERSION** Facebook graph API version (at least _v3.0_)
> * **WIT_TOKEN** Application token from [Wit](https://wit.ai/damienjarry/BumbleBot/entities)
> * **WIT_VERSION** Wit API version (at least _20180617_)
> * **GOOGLE_APIKEY** [Google API](https://developers.google.com) token
> * **PORT** Port exposed by Docker
> * **UID** UID used in Docker
> * **GID** GID used in Docker


### First way - Docker Compose

#### Dependencies
* [Docker](https://docs.docker.com/install/)
* [Docker Compose](https://docs.docker.com/compose/install/)

Install dependencies and start the docker-compose

```sh
cd BumbleBot
docker-compose up -d
# Check the output
docker-compose logs -f
```

### Second way - Server install

#### Dependencies
* [NodeJS](https://nodejs.org/en/download/)
* [Yarn](https://yarnpkg.com/lang/en/docs/install/)


Install dependencies

```sh
cd BumbleBot
yarn install
# retrieve .gitignore file...
git checkout -- ./node_modules
```

Build and/or run the project

```sh
yarn run start|serve|build-ts
```
