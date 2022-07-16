import { prismaClient } from '../../database/prismaClient'

interface OrderRequest {
  order_id: string
}

export default class SendOrderService {
  async execute({order_id}: OrderRequest) {

    const order = await prismaClient.order.update({
      where: {
        id: order_id
      },
      data: {
        draft: false
      }
    })

    return order
  }
}