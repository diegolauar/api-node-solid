import fastify from 'fastify'
import { env } from './env'
import fastifyCookie from '@fastify/cookie'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import { userRoutes } from './http/controller/users/routes'
import { gymsRoutes } from './http/controller/gyms/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(userRoutes)
app.register(gymsRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
      return reply
        .status(400)
        .send({ message: 'Validation error.', issues: error.format() })
    }
  
    if (env.NODE_ENV !== 'production') {
      console.error(error)
    } else {
      // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
    }
  
    return reply.status(500).send({ message: 'Internal server error.' })
  })



//CRIAR IMAGEM DOCKER EXEMPLO BACNO:
// docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql