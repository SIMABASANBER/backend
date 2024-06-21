import sql from './connection.js'

const Questions = function (question) {
    this.title = question.title
    this.choise_a = question.choise_a
    this.choise_b = question.choise_b
    this.choise_c = question.choise_c
    this.choise_d = question.choise_d
    this.correct_answer = question.correct_answer
}

const table = 'questions'

Questions.create = (newQuestions, result) =>{
    sql.query(`INSERT INTO ${table} SET ?`, newQuestions, (err, res) =>{
        if (err){
            result(err, null)
        } result(null, {id: res.InsertId, newQuestions})

    })
}

Questions.getAll = (page, pageSize, result) =>{
    const offset = (page -1) * pageSize;
    console.log(`Page: ${page}, PageSize: ${pageSize}, Offset: ${offset}`);
    const query = `SELECT id, title,  choise_a, choise_b, choise_c, choise_d FROM ${table} LIMIT ?,?`
    sql.query(query, [offset, pageSize], (err, res)=>{
        if (err){
            result(err, null)
        }result(null, res)
    })
}

Questions.findById = (id, result)=>{
    sql.query(`SELECT id, title, choise_a, choise_b, choise_c, choise_d FROM ${table} WHERE id = ${id}`, (err, res)=>{
        if(err) {
            result(err, null)
            return
        }

        //jika data ditemukan
        if(res.length){
            result(null, res[0])
            return
        }
        //jika kosong
        result({type: 'not_found' }, null)
    })
}

Questions.update = (id, data, result) => {
    sql.query(`UPDATE ${table} SET title = ?, choise_a = ?, choise_b = ?, 
    choise_c = ?, choise_d = ?, correct_answer = ? WHERE id = ? `, 
        [data.title, data.choise_a, data.choise_b, 
            data.choise_c, data.choise_d, data.correct_answer, id], (err, res)=>{
                if(err) {
                    result(err, null)
                    return
                }
    
                if(res.affectedRows === 0){
                    result({type: 'not_found'}, null)
                    return
                }
    
                result(null, {id: id, data})
            })
}

Questions.delete = (id, result) =>{
    sql.query(`DELETE FROM ${table} WHERE id = ?`, id,(err, res)=>{
        if(err){
            result(err, null)
            return
        }

        if(res.affectedRows === 0){
            result({type: 'not_found'}, null)
            return
        }
        result(null, res)
    })
}

Questions.getTotalQuestion = (result) => {
    const query = `SELECT COUNT(*) AS total_question FROM ${table}`;
    sql.query(query, (err, res) =>{
        console.log(err);
        if(err) result(err, null)
        result(null, res)
    })
}

export default Questions