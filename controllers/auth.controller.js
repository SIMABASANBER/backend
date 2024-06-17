import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()


export const register = async (req, res) => {

    // cekk jika username terdaftar

    const userExist = await new Promise((resolve, reject) => {
        User.getByUserRegister(req.body.username, (err, data) => {
            if(err) {
                if(err.type === 'not_found'){
                    // username belum terdaftar
                    resolve(false)    
                } else{
                    // ada error
                    reject(err)
                }
            } else{
                // username sudah terdaftar
                resolve(true)
            }
        })
    })

    if (userExist) {
        return res.status(400).json({message: `Username ${req.body.username} already exist`})
    }


    const encryptPassword = await bcrypt.hash(req.body.password, 10)

    const newUser = new User({
        fullname: req.body.fullname,
        username: req.body.username,
        password: encryptPassword,
        email: req.body.email,
        from_school: req.body.from_school,
        graduation_year: req.body.graduation_year
    })

    console.log(newUser)
    console.log(newUser.password);
    User.create(newUser, (err, data) => {
        if(err) res.status(500).send({msg: "Exist some error"})
        res.send(data)
    })

}



export const login = (req, res) => {
    const { username, email, password } = req.body

    // cek username, email dan password tidak boleh kosong
    if((!username && !email) || !password ){
        return res.status(404).send({message: "Username / Email dan Password tidak boleh kosong"})
    }

    // cek user login menggunakan username atau email
    const identifierLogin = username ? {username} : {email}
    
    // cek jika user sudah terdaftar
        // lanjut login
        // kirim pesan user tidak terdaftar

        User.getByUserLogin(identifierLogin, async (err, user) => {
        if(err) {
            if(err.type === 'not_found'){
                // user not found (belum terdaftar)
                return res.status(404).send({message: "User not registered"})
            } else{
                // ada error
                console.log(err);
                res.status(500).send({message: "Exist some error"})
            }
        } 

        // cek password benar atau tidak
        const userPassword = user.password
        const isValidPassword = await bcrypt.compare(password, userPassword)
        if(!isValidPassword){
            return res.status(404).json({message: "Invalid password"})
        }

        // jika lolos, generate token
        // (user info, secretKey, expiredTime)
        const token = jwt.sign({userId: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.json({token})

    })
}