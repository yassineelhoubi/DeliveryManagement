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
            _id: user._id
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

export {
    createDeliveryManager
}