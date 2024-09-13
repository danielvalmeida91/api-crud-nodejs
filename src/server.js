import Fastify from 'fastify'
import { createUser, deleteUser, getUsers, updateUser } from './controller/userController.js'

const fastify = Fastify()

fastify.get('/users', getUsers)
fastify.post('/user', createUser)
fastify.put('/user/:id', updateUser)
fastify.delete('/user/:id', deleteUser)

const startServer = () => {
  try {
    fastify.listen({
      port: 8000
    })
    console.log('Servidor iniciado na porta 8000')
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

startServer()
