import User from "../models/User.js"
import Manager from "../models/Manager.js"
import { createToken } from "../helpers";


const registerManager = (req, res) => {

   const { username, email, password } = req.body
   const role = "MANAGER"
   const user = new User({ email, password, role });
   user.save((err, result) => {
      if (err) {
         return res.status(400).json(err)
      }
      const managerData = {
         username: username,
         _id: result._id
      }
      const manager = new Manager(managerData);
      manager.save((err, result) => {
         if (err) {
            return res.status(400).json({ err })
         }
         res.json({ result })
      })
   })

}


export { registerManager }
