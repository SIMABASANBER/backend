// import User from "../models/User.js"
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'


// export const register = async (req, res) => {
//     //check username apakah sudah terdaftar
//        //get user by username
//        const userExist = await new Promise((resolve, reject)=>{
//         //    User.findByUsername(req.body.username, (err, data)=>{
//         //        if(err) {
//         //            if(err.type === 'not_found'){
//         //               //username belum terdaftar
//         //                resolve(false)
//         //            }else{
//         //                //terdapat error
//         //                reject(err)
//         //            }
//         //        }else{
//         //            //username sudah terdaftar
//         //            resolve(true)           
//         //        }
                 
//         //    })
//        })
   
//        if(userExist){
//            return res.status(400).json({message: "username already exist"})
//        }
   
   
//        const encrypPassword = await bcrypt.hash(req.body.password, 10)
       
//        const newUser = new User({
//            namea: req.body.nama,
//            jurusan: req.boq.jurusan,
//            username: req.body.username,
//            password: encrypPassword,
//        })
   
//        User.create(newUser, (err, data) => {
//            if(err) res.status(500).send({msg:"Exist some error"})
//            res.send(data)
//        })
//    }

// export const login = (req, res,) => { 
//     const{username, password} = req.body
//     // cek jika username sudah terdaftar
//     // lanjut login
//     // send msg, useranme belum terdaftar

//     User.findByUsername(username, async(err, user, next)=>{
//         if(err) {
//             if(err.type === 'not_found'){
//                 // user not found (belum terdaftar)
//                 // return res.status(404).send({
//                 //     messagge: 'user not registered'     
//                 // })

//                 //implementasi error handler
//                return next(new Error('user not registered'))
               
//             }else{

//                 // res.status(500).send({msg:"exist some error"})

//                 return next(err)
//             }
//         }

//         //cek password benar atau tidak
//         const userPassword = user.password
//         const isValidPassword = await bcrypt.compare(password, userPassword)
//           if(!isValidPassword){
//             return res.status(401).json({message:" Invalid Password"})
//           }

//           //lolos, genarate token
//           //(userInfo, secretKey, expireTime )
//           const token = jwt.sign({userId: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'})
//           res.json({token})

//     })
// }

