import User from "../models/User.js"
import Manager from "../models/Manager.js"
import { CreateUserMail } from "../helpers";
const logger = require('../../config/winston');

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
         _id: user._id,
         user: user._id,
      }
      const manager = new Manager(managerData);
      await manager.save()
      // 
      logger.info(`Manager: ${user.email} Created!`);
      CreateUserMail(
         user.email,
         user.password,
         manager.username
      );
      res.status(201).json({
         status: true,
         message: { user, manager }
      })
   } catch (e) {
      logger.error(e.message);
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
         logger.info(`Manager: ${doc.email} removed!`);
         res.status(200).json({
            status: true,
            message: "Deleted successfully"
         })
      } else {
         res.status(404).json({
            status: false,
            message: "Not Found"
         })
      }
   } catch (e) {
      logger.error(e.message);
      res.status(400).json({
         status: false,
         message: e.message
      })
   }
}

const getAllManagers = async (req, res) => {
   try {
      const docs = await Manager.find().populate("user")
      const data = await docs.map((e) => {
         return {
            _id: e._id,
            username: e.username,
            email: e.user.email,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt,

         }
      })
      res.status(200).json({
         status: true,
         message: data
      })
   } catch (err) {
      logger.error(e.message);
      res.status(400).json({
         status: false,
         message: err.message
      })
   }
}

const getManager = async (req, res) => {
   const id = req.params.id
   try {
      const doc = await Manager.findById({ _id: id }).populate("user")
      res.status(200).json({
         status: true,
         message: { username: doc.username, createdAt: doc.createdAt, updatedAt: doc.updatedAt, email: doc.user.email }
      })
   } catch (err) {
      logger.error(err.message);
      res.status(400).json({
         status: false,
         message: err.message
      })
   }
}

const UpdateManager = async (req, res) => {
   try {
      var id = req.params.id
      if (req.body.username) {
         const filter = { _id: id }
         await Manager.findOneAndUpdate(filter, req.body);
      }
      if (req.body.email || req.body.password) {
         const doc = await Manager.findById(id)
         const filter = { _id: doc.user }
         await User.findOneAndUpdate(filter, req.body)
         logger.info(`Manager: ${doc.email} updated!`);
      }
      res.status(200).json({
         status: true,
         message: "Updated successfully",
      })
   } catch (e) {
      logger.error(e.message);
      res.status(400).json({
         status: false,
         message: e.message
      })
   }
}

export { createManager, removeManager, getAllManagers, getManager, UpdateManager }
