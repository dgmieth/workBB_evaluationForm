var mysql = require('mysql')
//==================================================================================
//                   SELECIONA QUAL SERVIDOR SERÁ USADO 
//==================================================================================
//var serverInfo = require('./serverInfo48')
var serverInfo = require('./serverInfo49')
//==================================================================================
//                   CONECTA COM O SERVIDOR MYSQL 
//==================================================================================
var pool = mysql.createPool({
    host: serverInfo.host,
    user: serverInfo.user,
    password: serverInfo.pass,
    database: serverInfo.database,
    multipleStatements: true,
})
pool.getConnection(function(error){
    if(error) throw error
})
pool.on('release', function(connection){
    //console.log('Connection %d release', connection.threadId)
})
module.exports = pool