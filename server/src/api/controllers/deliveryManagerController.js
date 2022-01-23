import User from "../models/User.js"
import DeliveryManager from "../models/DeliveryManager"


const createDeliveryManager = async (req, res) => {

    const { username, email, password } = req.body

    try {
        const userData = {
            role: "DELIVERYMANAGER",
            email: email,
            password: password
        }
        const user = new User(userData);
        await user.save()
        // 
        const deliveryManagerData = {
            username: username,
            user: user._id
        }
        const deliveryManager = new DeliveryManager(deliveryManagerData);
        await deliveryManager.save()

        res.status(201).json({
            status: true,
            message: { user, deliveryManager }
        })
    } catch (e) {
        console.log(e.message)
        res.status(400).json({
            status: false,
            message: e.message
        })
    }
}

const removeDeliveryManager = async (req, res) => {
    try {
        const { id } = req.params
        const doc = await DeliveryManager.findById({ _id: id })//find the Driver
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
const getAllDeliveryManagers = async (req, res) => {
    try {
        const docs = await DeliveryManager.find().populate("user")
        res.status(200).json({
            status: true,
            message: docs
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: err.message
        })
    }
}

const getDeliveryManager = async (req, res) => {
    const id = req.params.id
    try {
        const docs = await DeliveryManager.findById({ _id: id }).populate("user")
        res.status(200).json({
            status: true,
            message: docs
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: err.message
        })
    }
}
export {
    createDeliveryManager,
    removeDeliveryManager,
    getAllDeliveryManagers,
    getDeliveryManager
}
