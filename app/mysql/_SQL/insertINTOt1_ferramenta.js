var mysql = require('../mysql')
//==================================================================================
//                   INSERE DADOS
//==================================================================================
module.exports = (matricula, results,callback)=>{
    mysql.query(`INSERT INTO avaliaFerramentas.t2_avaliacao (avaliador,idFerramenta,prazo,entrega,nota,naoAvaliar)
                VALUES(
                        '${matricula}',
                        (SELECT t.id FROM avaliaFerramentas.t1_ferramentas t WHERE t.Ferramenta = '${results.ferramenta}'),
                        '${results.answer1}',
                        '${results.answer2}',
                        ${results.nota},
                        ${results.naoAvaliar});`, (err,results)=>{
        if(err){
            callback({err: 'No return'},undefined)
        }else{
            callback(undefined, {results: 'Resultados salvos'})
        }
    })
}