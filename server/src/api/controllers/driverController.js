import User from "../models/User.js"
import Driver from "../models/Driver.js"

const createDriver = async (req, res) => {

    const { username, email, password } = req.body

    try {
        const userData = {
            role: "DRIVER",
            email: email,
            password: password
        }
        const user = new User(userData);
        await user.save()
        // 
        const driverData = {
            username: username,
            user: user._id,
        }
        const driver = new Driver(driverData);
        await driver.save()

        res.status(201).json({
            status: true,
            message: { user, driver }
        })
    } catch (e) {
        res.status(400).json({
            status: false,
            message: e.message
        })
    }
}


const removeDriver = async (req, res) => {
    try {
        const {
            id,
        } = req.params

        await User.findOneAndRemove({ _id: id })
        await Driver.findOneAndRemove({ _id: id })
        res.status(200).json({
            status: true,
            message: "deleted successfuly"
        })
    } catch (e) {
        res.status(400).json({
            status: false,
            message: e.message
        })
    }
}

const getAllDrivers = async (req, res) => {
    try {
        const docs = await Driver.find().populate("user")
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

// const getDriver = async (req, res) => {
//     const id = req.params.id
//     try {
//         const docs = await User.find({ _id: id }).where("role").equals("DRIVER")
//         res.status(200).json({
//             status: true,
//             message: docs
//         })
//     } catch (err) {
//         res.status(400).json({
//             status: false,
//             message: err.message
//         })
//     }
// }



export {
    createDriver,
    removeDriver,
    getAllDrivers,
    // getDriver
}