import { prismaClient } from "../../database/prismaClient"

interface CategoryRequest {
  name: string
}

export default class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    if (name === '') {
      throw new Error('Name is required')
    }

    const category = await prismaClient.category.create({
      data: {
        name: name
      },
      select: {
        id: true,
        name: true
      }
    })

    return category
  }
}