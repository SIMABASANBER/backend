import Rangking from "../models/rangking.js";

export const findRangking = (req, res) => {
    Rangking.getRangking((err, data) =>{
        if(err){
            return res.status(500).send({msg: "Exist some error"})
        }
        res.send(data)
    })
}

export const totalRangking = (req, res) => {
    Rangking.getTotalRangking((err, data) =>{
        if(err){
            return res.status(500).send({msg: "Exist some error"})
        }
        res.send(data[0])
    })
}