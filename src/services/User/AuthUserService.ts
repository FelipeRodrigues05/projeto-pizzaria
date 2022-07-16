import { prismaClient } from "../../database/prismaClient";
import { compare } from "bcryptjs"
import { sign } from 'jsonwebtoken'

interface UserRequest {
  email: string,
  password: string
}

export default class AuthUserService {
  async execute({ email, password }: UserRequest) {

    // PROCURA O USER NO DB
    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if(!user) {
      throw new Error("User/password incorrect")
    }

    // COMPARA A SENHA CRIPTOGRAFADA COM A SENHA COLOCADA PELO USER
    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch) {
      throw new Error("Password is incorrect")
    }

    // GERAR UM WEB TOKEN
    const JWTToken = sign(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: JWTToken
    }
  }
}