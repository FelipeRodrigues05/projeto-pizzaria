import { prismaClient } from '../../database/prismaClient'

interface OrderRequest {
  order_id: string
}

export default class RemoveOrderService {
  async execute({ order_id }: OrderRequest) {

    const order = await prismaClient.order.delete({
      where: {
        id: order_id
      }
    })

    return order
  }
}