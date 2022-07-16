import { Request, Response } from 'express'
import ListOrdersService from '../../services/Order/ListOrdersService'

export default class ListOrdersController {
  async handle(req: Request, res: Response) {
    const listOrder = new ListOrdersService()

    const orders = await listOrder.execute()

    return res.json(orders)
  }
}