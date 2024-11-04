import fastify from 'fastify'
import { appRoutes } from './http/routes'

export const app = fastify()

console.log('a')

app.register(appRoutes)



//CRIAR IMAGEM DOCKER EXEMPLO BACNO:
// docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql