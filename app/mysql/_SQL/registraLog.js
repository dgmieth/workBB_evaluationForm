var mysql = require('../mysql')
//==================================================================================
//                   REGISTRA LOG NA BASE DA FERRAMENTA 
//==================================================================================
module.exports = (databaseUser, description,callback)=>{
    mysql.query(`INSERT INTO avaliaFerramentas.t9_log (databaseUser,description) VALUES('${databaseUser}','${description}');`, (err,results)=>{
        if(err){
            callback({err: 'data not saved'},undefined)
        }else{
            callback(undefined, {success: 'saved successfully'})
        }
    })
}