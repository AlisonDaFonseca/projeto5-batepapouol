const usuario = prompt('Qual seu nome?');
axios.defaults.headers.common['Authorization'] = 'A7fh9QOJQiMmZBRvHfEth58I';

let mensagens = [
    
];


function pegarMensagensServidor(resposta){
    let promessa = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promessa.then(hospedarMensagensServidor);    
}

setInterval(pegarMensagensServidor, 3000);

const requisicao = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', {
    name: usuario
  });

function hospedarMensagensServidor(resposta){
    mensagens = resposta.data;

    renderizarMensagens();

}
function pedirOutroNome(erro){
    let erroNome = erro.response.status;

        while(erroNome === 400){
            usuario = prompt('Qual seu nome?')
        }
        requisicao = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', {
            name: usuario
          });
        
} 

requisicao.catch(pedirOutroNome);


function verificaConexao(){
    const requisicao = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', {
            name: usuario
          })
    console.log(requisicao);
}

setInterval(verificaConexao, 5000);

function renderizarMensagens(){
   const listaMensagens = document.querySelector('.corpo');
   listaMensagens.innerHTML = '';

   for(let i = 0; i < mensagens.length; i++){
    let novaListaMensagens = mensagens[i];
    if(novaListaMensagens.type === 'status'){
        listaMensagens.innerHTML += `
        <div class="corpo-mensagem cinza " data-test="message">
            <div class="identificacao">
                <p><span class="tempo"> (${novaListaMensagens.time}) </span> <span class="nome"> ${novaListaMensagens.from} <span class="mensagem">${novaListaMensagens.text}</span> </p>
            </div> 
        </div>
    `;
    }else{
        listaMensagens.innerHTML += `
        <div class="corpo-mensagem branco" data-test="message">
            <div class="identificacao">
                <p><span class="tempo"> (${novaListaMensagens.time}) </span> <span class="nome"> ${novaListaMensagens.from} </span> para <span class="nome">${novaListaMensagens.to}</span> <span class="mensagem">${novaListaMensagens.text}</span> </p>
            </div> 
        </div>
    `;
    }
    }
    

};

function tratarErro(erro){

    const error = erro.response.status;
   if(error === 400){
        window.location.reload();
    }
}
function enviarMensagem(){
    const campoEscrever = document.querySelector('.campo-escrever');
   
    const novaMensagem = {
        from: usuario,
		to: "Todos",
		text: campoEscrever.value,
		type: "message"
    
    };

    

   const requisicaoMensagem = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', novaMensagem);
   requisicaoMensagem.then(pegarMensagensServidor);

   requisicaoMensagem.catch(tratarErro);
   
}

