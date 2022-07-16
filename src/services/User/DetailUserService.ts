import { prismaClient } from "../../database/prismaClient";

export default class DetailUserService {
  async execute(id: string) {

    const user = await prismaClient.user.findFirst({
      where: {
        id: id
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })
    return user
  }
}