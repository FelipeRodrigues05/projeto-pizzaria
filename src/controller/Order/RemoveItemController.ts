import { Request, Response } from 'express'
import RemoveItemService from '../../services/Order/RemoveItemService'

export default class RemoveItemController {
  async handle(req: Request, res: Response) {
    const item_id = req.query.item_id as string

    const removeItem = new RemoveItemService()

    const item = await removeItem.execute({ item_id })

    return res.json(item)
  }
}