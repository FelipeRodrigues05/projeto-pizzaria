import { Router } from "express"
import multer from "multer"
import CreateCategoryController from "../controller/Category/CreateCategoryController"
import ListCategoryController from "../controller/Category/ListCategoryController"
import CreateProductController from "../controller/Products/CreateProductController"
import AuthUserController from "../controller/User/AuthUserController"
import CreateUserController from "../controller/User/CreateUserController"
import DetailsUserController from "../controller/User/DetailUserController"
import isAuthenticated from "../middlewares/isAuthenticated"
import uploadConfig from "../config/multer"
import ListByCategoryController from "../controller/Products/ListByCategoryController"
import CreateOrderController from "../controller/Order/CreateOrderController"
import RemoveOrderController from "../controller/Order/RemoveOrderController"
import AddItemController from "../controller/Order/AddItemController"
import RemoveItemController from "../controller/Order/RemoveItemController"
import SendOrderController from "../controller/Order/SendOrderController"
import ListOrdersController from "../controller/Order/ListOrdersController"
import DetailOrderController from "../controller/Order/DetailOrderController"
import FinishOrderController from "../controller/Order/FinishOrderController"

const router = Router()
const upload = multer(uploadConfig.upload("./tmp"))

//-- USER --
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/details', isAuthenticated, new DetailsUserController().handle)

//-- CATEGORY --
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)

//-- PRODUCTS --
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)

//-- ORDER --
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.get('/order', isAuthenticated, new ListOrdersController().handle)

//-- ORDER ITEM --
router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.get('/order/details', isAuthenticated, new DetailOrderController().handle)
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)

export default router