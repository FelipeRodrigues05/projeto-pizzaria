import { Request, Response } from 'express'
import CreateProductService from '../../services/Products/CreateProductService'

export default class CreateProductController {
  async handle(req: Request, res: Response) {
    const createProductService = new CreateProductService()

    const { name, price, description, category_id } = req.body

    if (!req.file) {
      throw new Error("Error uploading file")
    } else {

      const { filename: banner, originalname } = req.file

      const product = await createProductService.execute({
        name,
        price,
        description,
        category_id,
        banner
      })

      return res.json(product)
    }

  }
}