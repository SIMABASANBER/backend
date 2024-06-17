import sql from './connection.js'

const Answer = function(jawaban){
    this.answerUser = jawaban.answerUser
}

Answer.getAll = (result) => {
    sql.query("SELECT id, correct_answer FROM questions", (err, res) => {
        if(err) {
            result(err, null)
        }
        result(null, res)
    })
}
Answer.findById = (id, result) => {
    sql.query(`SELECT correct_answer FROM questions WHERE id = ${id}`, (err, res)=> {
        if(err) {
            result(err, null)
            return
        }

        // jika data ditemukan
        if(res.length) {
            result(null, res[0])
            return
        }
        // jika kosong
        result({type: 'not_found'}, null)
    } )
}


export default Answer