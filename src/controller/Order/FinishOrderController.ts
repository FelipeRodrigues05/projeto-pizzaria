import { Request, Response } from 'express'
import FinishOrderService from '../../services/Order/FinishOrderService'

export default class FinishOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.body

    const finishOrder = new FinishOrderService()

    const order = await finishOrder.execute({ order_id })

    return res.json(order)
  }
}