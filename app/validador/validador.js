//criando as variáveis
const axios = require('axios')
const https = require('https')

const urlInfo = require('./urlInfo')
const registraLog = require('../mysql/_SQL/registraLog')
//==============================================================================================
//VERIFICA SE FUNCIONÁRIO ESTÁ NO PONTO E REGISTRA LOG NA TABELA PARA CADA SESSÃO ATIVA
//==============================================================================================
//criado código para validação do usuário e inserindo informações do intranet.bb.com.br no req
module.exports = {
    async validaToken(req,res,next) {
        var header = req.headers
        var objetoHeader = header
        
        objetoDados = []
        delete objetoHeader["content-length"]
        objetoHeader.host = urlInfo.host;
        objetoHeader["user-agent"] = "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:60.0) Gecko/20100101 Firefox/60.0"
        var endereco = urlInfo.endereco
        
        return await axios({
            method: 'GET',
            url: endereco,
            headers: objetoHeader,
            strctSSL: false,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }).then(async response => {
            if(response.status > 300) {
                res.charset = 'UTF-8',
                res.status(401).send({error: 'Efetue login na intranet novamente'})
            } else {
                
                const usuario = response.data.attributes
                
                for await (objeto of usuario) {
                    if (objeto.name == "cd-cmss-usu") {
                        req.session.comissao = objeto.values
                    }
                    if (objeto.name == "chaveFuncionario") {
                        req.session.chave = objeto.values + ""
                    }
                    if (objeto.name == "cd-pref-depe") {
                        req.session.prefixo = objeto.values
                    }
                    if (objeto.name == "cd-eqp") {
                        req.session.eqp = objeto.values
                    }
                } 
                if (req.session.prefixo = 4935) {
                    if(!req.session.logged){
                        registraLog(req.session.chave, 'Log-in',(err,success)=>{
                            if(err){
                                next();
                            } else {
                                req.session.logged = true
                                next();
                            }
                        })
                        }else{
                            next();
                         }
                } else {
                    res.satus(401).send({error: "acesso negado"})
                }
            }
        }).catch(err =>{
            res.status(401).send({error: "Acesso negado! Efetue login na intranet novamente."})
        })
    }
}
