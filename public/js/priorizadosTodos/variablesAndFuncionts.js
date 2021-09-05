//====================================================================================================
//                                         priorizadosTodos.hbs
//====================================================================================================
//====================================================================================================
//                                         FUNÇÕES
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//                     Trata objeto retornado da rota de serviços


//----------------------------------------------------------------------------------------------------
const selectO = document.getElementById('selectO')
const naoAvaliar = document.getElementById('notAnswer')
const text1 = document.getElementById('text1')
const p1_texto = document.getElementById('p1_texto')
const text2 = document.getElementById('text2')
const p2_texto = document.getElementById('p2_texto')
const nota_container = document.getElementsByName('nota_container')
const radios = document.getElementsByClassName('form-check-input')
const btnEnviar = document.getElementById('btn-enviar')
var selectedNote = 0

const successMsg = document.getElementById('successMsg')
const warningMsg = document.getElementById('warningMsg')

naoAvaliar.addEventListener('click',()=>{
    if(naoAvaliar.checked){
        text1.disabled = true
        text1.classList.add('disabled')
        text2.disabled = true
        text2.classList.add('disabled')
        for (const e of radios) {
            e.classList.add('disabled')
            e.disabled = true
        }
    }else{
        text1.disabled = false
        text1.classList.remove('disabled')
        text2.disabled = false
        text2.classList.remove('disabled')
        for (const e of radios) {
            e.classList.remove('disabled')
            e.disabled = false
        }
    }
})

text1.addEventListener('keyup',()=>{
    p1_texto.innerHTML = `${255 - text1.value.length} caracteres` 
})

text2.addEventListener('keyup',()=>{
    p2_texto.innerHTML = `${255 - text2.value.length} caracteres` 
})
btnEnviar.addEventListener('click',(e)=>{
    if(selectO.value==='Selecione a ferramenta'){
        dangerMsg.innerHTML = 'Selecione <strong>uma ferramenta</strong> para avaliar'
            $('document').ready(function(){
                $('#dangerAlert').show('fade')
                $('#dangerAlertCloseBtn').click(function(){
                    $('#dangerAlert').hide('fade')
                })
            })
            alertTimeOut(1)
    }else {
        var counter = 1
        for (const e of radios) {
            if(e.checked){
                selectedNote = counter
            }
            counter = counter + 1
        }
        var nao = 0
        if(naoAvaliar.checked){
            nao = 1
            selectedNote = 0
        }else {
            nao = 0
        }
        if(nao===0 & selectedNote===0){
            dangerMsg.innerHTML = 'Assinale que <strong>não avaliará</strong> a ferramenta <strong>OU</strong> marque pelo menos <strong>qual nota (de 1 a 5)</strong> a ferramenta obteve'
            $('document').ready(function(){
                $('#dangerAlert').show('fade')
                $('#dangerAlertCloseBtn').click(function(){
                    $('#dangerAlert').hide('fade')
                })
            })
            alertTimeOut(1)
        } else {
            var ferramenta = selectO.value.split(' -')[0]
            var objData = {
                naoAvaliar : nao,
                answer1 : text1.value,
                answer2 : text2.value,
                ferramenta : ferramenta,
                nota : selectedNote
            }
            fetch('/registraAvaliacao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objData)
            }).then((response)=>{
                response.json().then((data) => {
                    $(window).scrollTop(0)
                    if(data.results){
                        successMsg.innerHTML= data.results
                        $('document').ready(function(){
                            $('#successAlert').show('fade')
                            $('#successAlertCloseBtn').click(function(){
                                $('#successAlert').hide('fade')
                            })
                        })
                        alertTimeOut(1)
                    }else if(data.error){
                        dangerMsg.innerHTML = data.error.error
                        $('document').ready(function(){
                            $('#dangerAlert').show('fade')
                            $('#dangerAlertCloseBtn').click(function(){
                                $('#dangerAlert').hide('fade')
                            })
                        })
                        alertTimeOut(2)
                    }
                })
            })
        }
    }
})

function alertTimeOut(e){
    if(e===1){
        setTimeout(()=>{
            $('#successAlert').hide('fade')
            $('#dangerAlert').hide('fade')
        },6000)
    }else if (e===2){
        setTimeout(()=>{
            $('#successAlert').hide('fade')
            $('#dangerAlert').hide('fade')
        },10000)
        location.reload()
    }
    
}