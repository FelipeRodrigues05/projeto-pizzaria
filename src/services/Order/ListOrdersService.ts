import { prismaClient } from '../../database/prismaClient'

export default class ListOrdersService {
  async execute() {

    const orders = await prismaClient.order.findMany({
      where: {
        draft: false,
        status: false
      },
      orderBy: {
        created_at: 'desc'
      },
      select: {
        id: true,
        table: true,
        name: true,
        status: true
      }
    })

    return orders
  }
}