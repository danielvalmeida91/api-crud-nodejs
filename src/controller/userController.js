import { randomUUID } from 'node:crypto'

const users = [
  {
    "id": "834e3820-0c12-4a37-9e51-2e384318fd5f",
    "name": "João Silva",
    "email": "joaosilva@email.com"
  },
  {
    "id": "4a373820-0c12-4a37-9e51-2e384318fd5f",
    "name": "Joana Silva",
    "email": "joanasilva@email.com"
  },
]

export const getUsers = (request, response) => {
  response.status(200).send({data: users, message: "Usuários listados com sucesso."})
}

export const createUser = (request, response) => {
  try {
    const { name, email } = request.body
    const user = {
      id: randomUUID(),
      name,
      email
    }
    if(!name) return response.send({ message: 'Nome é obrigatório !'})
    if(!email) return response.send({ message: 'Email é obrigatório !'})

    users.push(user)
    return response.status(201).send({ data: user,  message: 'Usuário criado com sucesso!'})
  } catch (error) {
    response.status(500).send({message: 'Não foi possível criar o usuário !'})
  }
}

export const updateUser = (request, response) => {
  try {
    const { id } = request.params
    const { name, email } = request.body

    const user = users.find( user => user.id === id)
    if(!user) return response.status(400).send({message: 'Usuário não encontrado !'})
    
    user.name = name
    user.email = email
    
    response.status(200).send({ data: user, message: 'Usuário atualizado com sucesso !'})
  } catch (error) {
    response.status(500).send({message: 'Não foi possível atualizar o usuário !'})
  }
}

export const deleteUser = (request, response) => {
  const { id } = request.params

  const user = users.find(user => user.id === id)
  if(!user) {
    return response.status(400).send({message: 'Usurário não encontrado.'})
  }

  users.splice(users.indexOf(user), 1)
  response.status(200).send({ message: 'Usuário excluído com sucesso.'})
}