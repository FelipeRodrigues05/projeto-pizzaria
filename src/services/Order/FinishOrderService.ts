import { prismaClient } from '../../database/prismaClient'

interface OrderRequest {
  order_id: string
}

export default class FinishOrderService {
  async execute({ order_id }: OrderRequest) {

    const order = await prismaClient.order.update({
      where: {
        id: order_id
      },
      data: {
        status: true
      },
      select: {
        id: true,
        name: true,
        table: true
      }
    })

    return order
  }
}