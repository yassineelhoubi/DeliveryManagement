import User from "../models/User.js"
import Manager from "../models/Manager.js"
import { createToken } from "../helpers";


const createManager = async (req, res) => {

   const { username, email, password } = req.body

   try {
      const userData = {
         role: "MANAGER",
         email: email,
         password: password
      }
      const user = new User(userData);
      await user.save()
      // 
      const managerData = {
         username: username,
         _id: user._id
      }
      const manager = new Manager(managerData);
      await manager.save()

      res.status(201).json({
         status: true,
         message: { user, manager }
      })
   } catch (e) {
      console.log(e.message)
      res.status(400).json({
         status: false,
         message: e.message
      })
   }
}

const removeManager = async (req, res) => {
   try {
      const {
         id,
      } = req.params

      await User.findOneAndRemove({ _id: id })
      await Manager.findOneAndRemove({ _id: id })
      res.status(200).json({
         status: true,
         message: "deleted with success"
      })
   } catch (e) {
      res.status(400).json({
         status: false,
         message: e.message
      })
   }
}




export { createManager, removeManager }
