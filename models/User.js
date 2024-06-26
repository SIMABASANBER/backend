import sql from'./connection.js'

const User = function (user){
    this.fullname = user.fullname
    this.from_school = user.from_school
    this.graduation_year = user.graduation_year
    this.username  = user.username
    this.email = user.email
    this.password = user.password
}

const table = 'users'

User.create = (newUser, result) =>{
    sql.query (`INSERT INTO ${table} SET ?`, newUser,(err, res)=>{
        if (err){
            result(err, null)
        } result(null,{id: res.InsertId,newUser})
    })
}


User.getAll =(result) => {
    sql.query(`SELECT id, fullname, from_school, graduation_year, username, email FROM ${table} WHERE role = 'user' `, (err, res) => {    
        if(err) {
            result(err, null)
        }result(null, res)
    })
}



User.findById = (id, result) => {
    sql.query(`SELECT id, fullname, from_school, graduation_year, username, email FROM ${table} WHERE id = ${id}`, (err, res) => {
        if (err) {
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

User.update = (id, data, result) => {
    sql.query(`UPDATE ${table} SET fullname =?, from_school= ?, graduation_year = ?, 
    username = ?, email = ?, password = ? WHERE id = ?`, 
        [data.fullname, data.from_school, data.graduation_year, 
            data.username, data.email, data.password, id], (err, res) =>{
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


User.delete = (id, result) =>{
    sql.query(`DELETE FROM ${table} WHERE id = ?`, id, (err, res)=>{
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

User.getByUserRegister = (username, result) => {
    sql.query(`SELECT * FROM ${table} WHERE username = ?`, username, (err, res) => {
        if(err){
            result(err, null)
            return
        }

        //Jika data ditemukan
        if(res.length){
            result(null, res[0])
            return
        }

        // Jika data kosong
        result({type: 'not_found'}, null)
    })
}

User.getByUserLogin = (identifier, result) => {
    sql.query(`SELECT * FROM ${table} WHERE username = ? or email = ?`, [identifier.username, identifier.email], (err, res) => {
        if(err){
            result(err, null)
            return
        }

        //Jika data ditemukan
        if(res.length){
            result(null, res[0])
            return
        }

        // Jika data kosong
        result({type: 'not_found'}, null)
    })
}

User.getTotalUser = (result) => {
    const query = `SELECT COUNT(*) AS total_user FROM ${table}`;
    sql.query(query, (err, res) =>{
        if(err) result(err, null)
        result(null, res)
    })
}

export default User