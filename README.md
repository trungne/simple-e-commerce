
# Installation

## Environment file
Create a .env file with these value

Note that `DB_USER`, `DB_PASS`, `DB_NAME`, `DB_PORT` are arbitrary. You can enter values of your choice.

Obtain `NGROK_AUTH_TOKEN` [here](https://ngrok.com/docs/secure-tunnels/ngrok-agent/tunnel-authtokens/) if you want to deploy live.

```
DB_USER=postgres
DB_PASS=123456
DB_NAME=simple-e-commerce
DB_PORT=3004
DB_DOMAIN=localhost
NODE_ENV=development

NGROK_AUTH_TOKEN=
```

## Build Dockerfiles

Build the docker images using

`docker compose build`

If a permission error occurs, try
`sudo docker compose build`

## Start docker compose

### Local deployment
Start all the services using:

`docker compose up`

The web application is avaiable at `localhost:3000`

### Live deployment
If you have the `NGROK_AUTH_TOKEN` and want to deploy live. Use:

`docker compose --profile live up`

## Seed data
To seed data, run `yarn seed:product` or `npm seed:product` on your local machine.
make sure you have `yarn` or `npm` installed