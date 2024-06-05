import sql from'./connection.js'

const User = function (user){
    this.nama_lengkap = user.nama_lengkap
    this.asal_sekolah = user.asal_sekolah
    this.tahun_lulus = user.tahun_lulus
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

User.getAll = (page, pageSize, result) =>{
   
    const offset = (page -1) * pageSize;
    console.log(`Page: ${page}, PageSize: ${pageSize}, Offset: ${offset}`);
    const query = `SELECT id, nama_lengkap, asal_sekolah, tahun_lulus, username FROM ${table} WHERE role = 'user' LIMIT ?,?`
    sql.query(query, [offset, pageSize], (err, res)=>{
        if (err){
            result(err, null)
        }result(null, res)
    })
}

User.findById = (id, result) => {
    sql.query(`SELECT id, nama_lengkap, asal_sekolah, tahun_lulus, username FROM ${table} WHERE id = ${id}`, (err, res) => {
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
    sql.query(`UPDATE ${table} SET nama_lengkap = ?, asal_sekolah = ?, tahun_lulus = ?, 
    username = ?, email = ?, password = ? WHERE id = ?`, 
        [data.nama_lengkap, data.asal_sekolah, data.tahun_lulus, 
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


// User.findByUsername = (username, result) =>{
//     sql.query (`SELECT id, nama_lengkap, asal_sekolah, tahun_lulus FROM ${table} WHERE username = ${username}`, (err, res) =>{
//         if (err){
//             result(err,null)
//             return
//         }
//         //jika data ditemukan
//         if(res.lenght){
//             result(null, res[0])
//             return
//         }
//         //jika kosong
//         result({type: 'not_found'})
//     })
// }



User.findByUsername = (username, result) => {
    const query = `SELECT id, nama_lengkap, asal_sekolah, tahun_lulus, username FROM users WHERE username = ?`;
        sql.query(query, [username], (err, res) => {
            if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
            }

            if (res.length) {
                console.log("found user: ", res[0]);
                result(null, res[0]);
                return;
            }

             // Not found User with the username
             result({ type: 'not_found' }, null);
         });
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
export default User