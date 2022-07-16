import { prismaClient } from '../../database/prismaClient'

interface ItemRequest {
  item_id: string
}

export default class RemoveItemService {
  async execute({item_id}: ItemRequest) {
    const item = await prismaClient.items.delete({
      where: {
        id: item_id
      }
    })

    return item
  }
}