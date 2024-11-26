import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '../../use-cases/register'
import { PrismaUsersRespository } from '../../repositories/prisma/prisma-users-repository'
import { UserAlreayExistsError } from '../../use-cases/errors/user-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const usersRepository = new PrismaUsersRespository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  try {
    await registerUseCase.execute({
      name,
      email,
      password
    })
    
  } catch (err) {
    if( err instanceof UserAlreayExistsError){
      return reply.status(409).send({message: err.message})
    }
    return reply.status(500).send()
  }

  return reply.status(201).send()
}