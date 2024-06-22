import sql from './connection.js'

const Rangking = function (rangking){
    this.nilai = rangking.nilai
    this.grade = rangking.grade
}

Rangking.getRangking = (result) => {
    const query = `SELECT users.fullname, users.username, users.email, users.from_school, result.nilai, result.grade FROM result JOIN users ON result.user_id = users.id ORDER BY result.nilai DESC`;
    sql.query(query, (err, res) =>{
        if(err) result(err, null)
        result(null, res)
    })
}

Rangking.getTotalRangking = (result) => {
    const query = `SELECT COUNT(*) AS total_rangking FROM result`;
    sql.query(query, (err, res) =>{
        if(err) result(err, null)
        result(null, res)
    })
}

export default Rangking
