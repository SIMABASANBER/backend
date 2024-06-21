import  jwt from "jsonwebtoken"
import roleAccesss from "./roleAccess.js"

const authJWt = (req, res, next) => {

    // dapatkan Token
    const token = req.headers['authorization']?.replace("Bearer ", "")
    // cek token
    if(!token){
        return res.status(401).send({message: "Missing access token"})
    }

    // verify (memastikan token valid)
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(403).send({message: "Invalid token"})
        }

        req.userId = decoded.userId
        if(!roleAccesss(decoded.role, req.baseUrl, req.method)){
            return res.status(403).json({message: "Unauthorized access"})
        }
    
        next()
    }) 

}

export default authJWt