import { prismaClient } from '../../database/prismaClient'

interface ItemRequest {
  product_id: string,
  order_id: string,
  amount: number
}

export default class AddItemService {
  async execute({ product_id, order_id, amount }: ItemRequest) {

    const item = await prismaClient.items.create({
      data: {
        product_id: product_id,
        order_id: order_id,
        amount: amount
      }
    })

    return item;
  }
}