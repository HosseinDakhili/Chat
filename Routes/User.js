import express from 'express'
import { getOneUser, removeUser, updateUser } from '../Controllers/UserCn.js'

const userRoute = express.Router()
userRoute.route('/').get(getOneUser).patch(updateUser).delete(removeUser)

export default userRoute