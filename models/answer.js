import sql from './connection.js'

const Answer = function(jawaban){
    this.answerUser = jawaban.answerUser
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

Answer.findByUserId = (userId, result) => {
    const query = 'SELECT * FROM result WHERE user_id = ?';
    sql.query(query, [userId], (err, results) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, results[0]);
    });
},


Answer.update = (id, nilai, grade, result) => {
    const query = 'UPDATE result SET nilai = ?, grade = ? WHERE id = ?';
    sql.query(query, [nilai, grade, id], (err, results) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, results);
    });
},

Answer.create = (userId, nilai, grade, result) => {
    const query = 'INSERT INTO result (user_id, nilai, grade) VALUES (?, ?, ?)';
    sql.query(query, [userId, nilai, grade], (err, results) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, results);
    });
}


export default Answer