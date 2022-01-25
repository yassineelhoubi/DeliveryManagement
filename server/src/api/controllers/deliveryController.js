import Delivery from "../models/Delivery.js";
import {
    getDistance
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

export {
    addDelivery,
    removeDelivery
};