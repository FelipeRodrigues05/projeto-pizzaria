import { prismaClient } from '../../database/prismaClient'

interface OrderRequest {
  order_id: string;
}

export default class DetailOrderService {
  async execute({ order_id }: OrderRequest) {

    const details = await prismaClient.items.findMany({
      where: {
        order_id: order_id
      },
      include: {
        order: true,
        product: true
      }
    })

    if (details.length === 0) {
      return null
    }

    return details
  }
}