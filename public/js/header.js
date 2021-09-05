var allPages = document.getElementsByClassName('active')
var navbarDropdownMenuLink1 = document.getElementById('navbarDropdownMenuLink1')
var navbarDropdownMenuLink2 = document.getElementById('navbarDropdownMenuLink2')
var navbarDropdownMenuLink3 = document.getElementById('navbarDropdownMenuLink3')

var relTodosAtivos = document.getElementById('m1-i1')
var relTodos = document.getElementById('m1-i2')
var relDemandas = document.getElementById('m1-i3')
var relBBTS = document.getElementById('m1-i4')

var priorizaProt = document.getElementById('m2-i1')
var despriorizaProt = document.getElementById('m2-i2')

var alocaDetServ = document.getElementById('m3-i1')
var desalocaDetServ = document.getElementById('m3-i2')
var logFerramenta = document.getElementById('m3-i3')

for(let page of allPages){
    page.classList.remove('active')
}

switch (document.title) {
    case 'Demandas priorizadas - só protocolos ativos':
        navbarDropdownMenuLink1.classList.add('active-bold')
        relTodosAtivos.classList.add('active-bold')
        break;
    case 'Demandas priorizadas - relatório completo':
        navbarDropdownMenuLink1.classList.add('active-bold')
        relTodos.classList.add('active-bold')
        break;
    case 'Demandas priorizadas - relatório Demandas':
        navbarDropdownMenuLink1.classList.add('active-bold')
        relDemandas.classList.add('active-bold')
        break;
    case 'Demandas priorizadas - relatório BBTS':
        navbarDropdownMenuLink1.classList.add('active-bold')
        relBBTS.classList.add('active-bold')
        break;
    case 'Priorizar - Protocolos Passíveis de Priorização':
        navbarDropdownMenuLink2.classList.add('active-bold')
        priorizaProt.classList.add('active-bold')
        break;
    case 'Despriorizar - Protocolos Passíveis de Despriorização':
        navbarDropdownMenuLink2.classList.add('active-bold')
        despriorizaProt.classList.add('active-bold')
        break;
    case 'Alocar Detalhe de Serviço para BBTS - lista de detalhes passíveis de alocação':
        navbarDropdownMenuLink3.classList.add('active-bold')
        alocaDetServ.classList.add('active-bold')
        break;
    case 'Exluir Detalhe de Serviço da BBTS - lista de detalhes passíveis de exclusão':
        navbarDropdownMenuLink3.classList.add('active-bold')
        desalocaDetServ.classList.add('active-bold')
        break;
    case 'Log - Acessos & Configurações':
        navbarDropdownMenuLink3.classList.add('active-bold')
        logFerramenta.classList.add('active-bold')
        break;
    // case 'Relatório Protocolos':
    //     relProtAbertos.classList.add('active-bold')
    //     break;
    // case 'Configurações Anteriores':
    //     confAnteriores.classList.add('active-bold')
    //     break;
    default:
        navbarDropdownMenuLink.classList.add('active-bold')
        break;
}





