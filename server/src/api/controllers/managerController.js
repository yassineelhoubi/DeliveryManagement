import User from "../models/User.js"
import Manager from "../models/Manager.js"
import { createToken } from "../helpers";


const createManager = (req, res) => {

   const { username, email, password } = req.body
   const role = "MANAGER"
   const user = new User({ email, password, role });
   user.save((err, user) => {
      if (err) {
         return res.status(400).json(err)
      }
      const managerData = {
         username: username,
         _id: user._id
      }
      const manager = new Manager(managerData);
      manager.save((err, manager) => {
         if (err) {
            return res.status(400).json({ err })
         }
         res.json({ user, manager })
      })
   })
   /*  */

}
const removeManager = async (req, res) => {

   const {
      id,
   } = req.params

   await User.findOneAndRemove({ _id: id })
   await Manager.findOneAndRemove({ _id: id })
   res.status(200).json({
      msg: "deleted with success"
   })
}




export { createManager, removeManager }
