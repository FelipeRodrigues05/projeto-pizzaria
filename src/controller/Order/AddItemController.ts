import { Request, Response } from 'express'

import AddItemService from '../../services/Order/AddItemService'

export default class AddItemController {
  async handle(req: Request, res: Response) {
    const { product_id, order_id, amount } = req.body
    const addItem = new AddItemService()

    const order = addItem.execute({ product_id, order_id, amount })

    return res.json(order)
  }
}