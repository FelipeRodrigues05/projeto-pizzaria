import { Request, Response } from 'express'
import SendOrderService from '../../services/Order/SendOrderService'

export default class SendOrderController {
  async handle(req: Request, res: Response) {
    const order_id = req.query.order_id as string

    const sendOrder = new SendOrderService()

    const order = await sendOrder.execute({ order_id })

    return res.json(order)
  }
}