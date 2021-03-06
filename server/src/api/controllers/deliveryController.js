import Delivery from "../models/Delivery.js";
import Driver from "../models/Driver.js";
import {
    getDistance, assignDeliveryMail
} from "../helpers/";
import {
    getIdVehicleTypeByType
} from "../controllers"

const addDelivery = async (req, res) => {

    let deliveryDetails = req.body;

    let distance = await getDistance(req.body.from, req.body.to);

    let additionalData = {
        vehicleType: "",
        distance: distance,
        price: ""
    }
    const weight = deliveryDetails.weight;
    if (req.body.type == "National") {
        if (0 < weight && weight <= 3) {
            additionalData.price = weight * 40
        } else {
            additionalData.price = (weight - 3) * 5 + 120;//(120) is the price of 3 kg
        }
    } else {
        switch (req.body.zoneType) {

            case "Europe":
                additionalData.price = weight * 160
                break;
            case "America":
                additionalData.price = weight * 220
                break;
            case "Asia":
                additionalData.price = weight * 240
                break;
            case "Australia":
                additionalData.price = weight * 260
                break;
        }
    }
    if (0 < weight && weight <= 200) { // CAR CONDITION
        additionalData.vehicleType = await getIdVehicleTypeByType("car")
    } else if (200 < weight && weight <= 800) { // SMALL STRUCK CONDITION
        additionalData.vehicleType = await getIdVehicleTypeByType("small truck")
    } else if (800 < weight && weight <= 1600) { // BIG TRUCK CONDITION
        additionalData.vehicleType = await getIdVehicleTypeByType("big truck")
    }

    Object.assign(deliveryDetails, additionalData);

    try {
        const delivery = await Delivery.create(deliveryDetails);
        return res.status(201).json({
            status: true,
            message: delivery,
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: err.message,
        });
    }
};

const removeDelivery = async (req, res) => {
    // DELETE ONLY IF IN WaitList
    try {
        const { id } = req.params
        const doc = await Delivery.findById({ _id: id })
        if (doc) {
            // delete
            if (doc.status == "WaitList") {

                await doc.remove()
                res.status(200).json({
                    status: true,
                    message: "Deleted successfully"
                })
            } else {
                res.status(404).json({
                    status: false,
                    message: "You Can't deleted"
                })
            }
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

};

const getDelivery = async (req, res) => {
    const id = req.params.id
    try {
        const doc = await Delivery.findById({ _id: id })
        if (doc) {

            res.status(200).json({
                status: true,
                message: doc
            })
        } else {
            res.status(200).json({
                status: false,
                message: "Not Found"
            })
        }

    } catch (err) {
        res.status(400).json({
            status: false,
            message: err.message
        })
    }
}
const getAllDeliveries = async (req, res) => {

    try {
        const docs = await Delivery.find()
        if (docs) {

            res.status(200).json({
                status: true,
                message: docs
            })
        } else {
            res.status(200).json({
                status: false,
                message: "Not Found"
            })
        }

    } catch (err) {
        res.status(400).json({
            status: false,
            message: err.message
        })
    }
}

const updateDeliveryStatus = async (req, res) => {
    try {
        const id = req.params.id
        const reqStatus = req.body.status
        const idDriver = req.body.idDriver
        // get Delivery by id
        const doc = await Delivery.findById({ _id: id })

        // check if the Driver had an accepted delivery 
        const DriverDeliveryState = await Delivery.exists({ driver: idDriver, status: "Accepted" });
        // check if this Delivery Accepted by the authenticated driver
        const ownDriverDelivery = await Delivery.exists({ _id: id, driver: idDriver, status: "Accepted" })
        console.log(ownDriverDelivery, doc.status, reqStatus)
        // Delivery status : Pending => Accepted && the driver shouldn't a delivery accepted
        if (doc.status == "Pending" && reqStatus == "Accepted" && !DriverDeliveryState) {
            await Delivery.updateOne({ _id: id }, { status: reqStatus, driver: idDriver })
            res.status(201).json({
                status: true,
                message: "Updated Successfully"
            })
        }
        // Delivery status : Accepted => Received && this Delivery Accepted by the authenticated driver
        else if (doc.status == "Accepted" && reqStatus == "Received" && ownDriverDelivery) {
            await Delivery.updateOne({ _id: id }, { status: reqStatus })
            res.status(201).json({
                status: true,
                message: "Updated Successfully"
            })
        }
        else {
            res.status(200).json({
                status: false,
                message: "Cannot update"
            })
        }

    } catch (e) {
        res.status(400).json({
            status: false,
            message: e.message
        })
    }
}
const assignDelivery = async (req, res) => {
    const {
        id,
    } = req.params
    const delivery = await Delivery.findOne({ _id: id }).populate("createdBy").populate("vehicleType")
    const drivers = await Driver.find({ vehicleType: delivery.vehicleType._id }).populate("user")

    if (drivers.length != 0) {
        let sendMail = true
        await drivers.forEach(async (element) => {

            const alreadyTakeDelivery = await Delivery.exists({ driver: element._id, status: "Accepted" })
            if (!alreadyTakeDelivery) {
                if (sendMail) {
                    Delivery.updateOne({ _id: id }, { status: "Pending" })
                }
                sendMail = false
                assignDeliveryMail(
                    element.user.email,
                    element.user.username
                );
            }
        });
        res.status(200).json({
            status: true,
            msg: "This delivery is assigned now"
        })


    } else {
        res.status(400).json({
            status: false,
            msg: "No Driver available now. Check it later"
        })
    }

}


export {
    addDelivery,
    removeDelivery,
    getDelivery,
    getAllDeliveries,
    updateDeliveryStatus,
    assignDelivery
};