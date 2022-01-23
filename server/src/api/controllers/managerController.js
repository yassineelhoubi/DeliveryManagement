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
         user: user._id,
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
       const { id } = req.params
       const doc = await Manager.findById({ _id: id })//find the Driver
       // check if exists
       if (doc) {
           // delete
           await doc.remove()
           res.status(200).json({
               status: true,
               message: "Deleted successfuly"
           })
       } else {
           res.status(404).json({
               status: false,
               message: "Not Found"
           })
       }
   } catch (e) {
       res.status(400).json({
           status: false,
           message: e.message
       })
   }
}




export { createManager, removeManager }
