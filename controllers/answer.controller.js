import Answer from "../models/answer.js"

export const findAll = (req, res) => {
    console.log(req.userId)
    Answer.getAll((err, data) => {
        if(err){ 
            console.log(err)
            res.status(500).send({msg: "exist some error"})
        }
        res.send(data)
    })
}
  
export const findOne = (req, res)=>{
    Answer.findById(req.params.id, (err, data)=>{
        if(err) {
            if(err.type === 'not_found'){
                res.status(404).send({
                    messagge: `not found question with id : ${req.params.id}`
                })
                return
            }else{
                res.status(500).send({msg:"exist some error"})
            }
        }else{
            res.send(data)
        }
          
    })
}

let pointBenar = 0;
export const checkAnswer = (req, res)=>{
    const {answerUser} = req.body;
    Answer.findById(req.params.id, (err, data)=>{
        if(err) {
            if(err.type === 'not_found'){
                res.status(404).send({
                    messagge: `not found question with id : ${req.params.id}`
                })
                return
            }else{
                res.status(500).send({msg:"exist some error"})
            }
            console.log(data.correct_answer);
        }if (answerUser === data.correct_answer) {
            pointBenar+=10;
            res.json({msg:"Jawaban Benar"})
        } else {
            res.json({msg:"Jawban Salah"})
        }
        console.log(pointBenar)
    })
    
}