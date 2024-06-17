import bcrypt from 'bcrypt'
import User from "../models/User.js"


export const create = async (req, res) => {

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

export const findAll = (req, res) =>{
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;

    User.getAll(page, pageSize, (err, data)=>{
        if (err){
            console.log(err)
            res.status(500).send({msg: "exist some error"})
        }
        res.send(data)
    })
}

export const findOne = (req, res) =>{
    User.findById(req.params.id, (err, data) =>{
        if(err) {
            console.log(err)
            if (err.type === 'not_found' ){
                res.status(404).send ({
                    message: `not found user with id :${req.params.id}`
                })
                return
            }else {
                res.status(500).send({message: 'exist some error'})
            }
        }else{
            res.send(data)
        }
    })
}


export const findUsername = (req, res) => {
    const username = req.body.username || req.params.username; // Dukung req.body dan req.params

    if (!username) {
        res.status(400).send({
            message: 'Username is required'
        });
        return;
    }

    User.findByUsername(username, (err, data) => {
        if (err) {
            console.log(err);
            if (err.type === 'not_found') {
                res.status(404).send({
                    message: `Not found username: ${username}`
                });
            } else {
                res.status(500).send({
                    message: 'Some error occurred while retrieving the user'
                });
            }
        } else {
            console.log(req.params.username);
            res.send(data);
        }
    });
};


export const update = (req, res) =>{
    const userData = new User (req.body)
    User.update(req.params.id, userData, (err, data)=>{
        if(err) {
            console.log(err);
            if(err.type === 'not_found'){
                res.status(404).send({
                    message: `not found user with id : ${req.params.id}` 
                })
            }else {
                res.status(500).send({msg:"exist some error"})
            }
        }else{
            res.send(data)
        }
    })
}

export const destroy = (req, res)=>{
    User.delete(req.params.id, (err, data)=>{
        if(err){
            if(err.type === 'not_found'){
                res.status(404).send({
                    message: `not found user with id : ${req.params.id}` 
                })
            }else {
                res.status(500).send({msg:"exist some error"})
            }
        }else {
            res.send({msg: "succes delete user"})
        }
    })
}

