//express para o servidor web
const express = require('express')
const session = require('express-session')
const https = require('https')
const fs = require('fs')
const path = require('path')
const hbs = require('hbs')

//outras variáveis
const portHttp = 4016   
const portHttps = 4017
var key = fs.readFileSync(__dirname + '/ssl/key.pem','utf-8')
var cert = fs.readFileSync(__dirname + '/ssl/server.crt','utf-8')
const credentials = {
    key: key,
    cert: cert
}
const viewsPaths = path.join(__dirname,  '../templates/views')
const partialsPaths = path.join(__dirname,  '../templates/partials')
const publicPath = path.join(__dirname,  '../public')
//configurando a views no hbs
hbs.registerPartials(partialsPaths)

//criando aplicativo app do express
const app = express()

//configurando a session
const store = new session.MemoryStore()
//importando middlewares
const validador = require('./validador/validador')
const pool = require('./mysql/mysql')
//configurado ao app()
app.use(session({
    secret: "protPriorizados",
    name: "painelPriorizados",
    resave: true,
    saveUninitialized: true,
    store: store
}))
app.set('view engine', 'hbs')
app.set('views', viewsPaths)
app.use(express.static(publicPath))
app.use(express.urlencoded())
app.use(express.json())
app.use(validador.validaToken)
//outras informações
const appInfo = require('./appInfo')
//outras funções
var selectAllFromt1_ferramentas = require('./mysql/_SQL/selectAllfromt1_ferraments')
var insertINTOt1_ferramenta = require('./mysql/_SQL/insertINTOt1_ferramenta')
//==================================================================================
//==================================================================================
//                                   ROTEAMENTO
//==================================================================================
//==================================================================================
//----------------------------------------------------------------------------------
//                                 ROTAS DAS PAGINAS
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//carrega formulário com as ferramentas
app.get('/', (req,res)=>{  
    var data = {
        title: 'Avaliação de ferramentas',
        fer: ''
    }
    selectAllFromt1_ferramentas((error,results)=>{
        if(error){
            console.log(error)
        }else{
            data.fer = results.results
        }
        res.render('avaliacao', { data, appInfo })
    })
})
//----------------------------------------------------------------------------------
//                                 ROTAS DE SERVICOS
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//salva avaliacao
app.post('/registraAvaliacao', (req,res)=>{
    insertINTOt1_ferramenta(req.session.chave, req.body, (err,results)=>{
        if(err){
            res.statut(500).json(err)
        }else{
            res.status(200).json(results)
        }
    })
})
//==================================================================================
//==================================================================================
//                            ATIVANDO O SERVIDOR WEB
//==================================================================================
//==================================================================================
https.createServer(credentials,app).listen(portHttps)