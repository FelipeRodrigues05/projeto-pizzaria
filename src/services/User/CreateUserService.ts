import { prismaClient } from "../../database/prismaClient";
import { hash } from "bcryptjs"

interface UserRequest {
  name: string,
  email: string,
  password: string
}

export default class CreateUserService {
  async execute({ name, email, password }: UserRequest) {

    if (!email) {
      throw new Error("Email is required");
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if(userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8)

    const newUser = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return newUser
  }
}