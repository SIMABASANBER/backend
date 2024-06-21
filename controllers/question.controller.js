import Questions from "../models/questions.js";

export const create = (req, res) =>{
    const newQuestions = new Questions ({
        title: req.body.title,
        choise_a: req.body.choise_a,
        choise_b: req.body.choise_b,
        choise_c: req.body.choise_c,
        choise_d: req.body.choise_d,
        correct_answer: req.body.correct_answer
    })

    Questions.create(newQuestions,(err, data)=>{
        if(err){
            res.status(500).send({msg: "Exist some error"})
        }
        res.send(data)
    })
}


export const findAll = (req, res) => {
    Questions.getAll((err, data) => {  
        if(err){
            console.log(err)
            res.status(500).send({msg: "exist some error"})
        }
        res.send(data)
    })
}

export const findOne = (req, res)=>{
    Questions.findById(req.params.id, (err, data)=>{
        if(err){
            console.log(err)
            if(err.type === 'not_found'){
                res.status(404).send ({
                    message: `not found question with : ${req.params.id}`
                })
                return
            }else{
                res.status(500).send({message: 'exist some error'})
            }
        }else{
            res.send(data)
        }
    })
}

export const update =(req, res) =>{
    const questionsData = new Questions (req.body)
    Questions.update(req.params.id, questionsData, (err, data)=>{
        if(err){
            console.log(err)
            if(err.type == 'not_found'){
                res.status(404).send({
                    message: `found question with id : ${req.params.id}`
                })
            }else{
                res.status(500).send({msg:"exist some error"})
            }
        }else{
            res.send(data)
        }
    })
}

export const destroy = (req, res)=>{
    Questions.delete(req.params.id, (err, data)=>{
        if(err){
            if(err.type === 'not_found'){
                res.status(404).send({
                    message: `not found question with id : ${req.params.id}` 
                })
            }else {
                res.status(500).send({msg:"exist some error"})
            }
        }else {
            res.send({msg: "succes delete user"})
        }
    })
}

export const totalQuestion = (req, res) => {
    Questions.getTotalQuestion((err, data) =>{
        if(err){
            return res.status(500).send({msg: "Exist some error"})
        }
        res.send(data[0])
    })
}
export const getAllQuestionAdmin = (req, res) =>{
    Questions.getAllQuestionAdmin((err, data) => {
        if(err){
            console.log(err)
            res.status(500).send({msg: "exist some error"})
        }
        res.send(data)
    })
}
