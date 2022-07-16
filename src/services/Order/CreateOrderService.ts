import { prismaClient } from '../../database/prismaClient';

interface OrderRequest {
  table: number,
  name: string
}

export default class CreateOrderService {
  async execute({ name, table }: OrderRequest) {

    const newOrder = await prismaClient.order.create({
      data: {
        name: name,
        table: table
      }
    })

    return newOrder;
  }
}