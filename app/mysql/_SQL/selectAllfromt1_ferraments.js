var mysql = require('../mysql')
//==================================================================================
//                   RETORNA DADOS
//==================================================================================
module.exports = (callback)=>{
    mysql.query(`SELECT t.* FROM avaliaFerramentas.t1_ferramentas t;`, (err,results)=>{
        if(err){
            callback({err: 'no return'},undefined)
        }else{
            callback(undefined, {results: results})
        }
    })
}