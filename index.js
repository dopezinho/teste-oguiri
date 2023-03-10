import { buttons } from "./button.js";

//Buttons functionality

let nPlayers = 1;
let nChar = 1;
buttons(nPlayers, nChar)

//Number of players and charlatans

function selectNPlayers() {
    const minusPlayer = document.getElementById('minusPlayer');
    const plusPlayer = document.getElementById('plusPlayer');
    
    plusPlayer.addEventListener('click', function() {
        if(nPlayers <= 10){
            nPlayers++
        }else if (nPlayers - nChar == 10 && nPlayers < 13){
            nPlayers++;
            nChar++;
        }else if (nPlayers < 13) {
            nPlayers++;
        }

    });
        
    minusPlayer.addEventListener('click', function() {
        if (nPlayers > 1 && nPlayers <= 11) {
            nPlayers--;
        }else if (nPlayers > 11 && nChar > 1 && nPlayers - nChar == 10){
            nPlayers--;
            nChar--;
        }else if (nPlayers > 1){
            nPlayers--;
        }
    });
    const minusChar = document.getElementById('minusChar');
    const plusChar = document.getElementById('plusChar');
    
    plusChar.addEventListener('click', function() {
        if (nChar < nPlayers) {
            nChar++;
        }
    });
    minusChar.addEventListener('click', function() {
        if (nChar > 1 && nChar <= 13) {
            nChar--;
        }
        if (nChar > 1 && nPlayers - nChar >= 10){
            nPlayers--;
            nChar--;
        }
    });
};

selectNPlayers();

//Start button, change screen to second point

let startButtom = document.getElementById('start');
let count = 1;
startButtom.onclick = function() {
    let list = selectScenario(nPlayers, nChar);
    let almostList = pushImpostor(list, nChar);
    let finalList = [almostList[0], shuffle(almostList[1])];
    console.log(finalList);
    let main = document.getElementById('template');
    main.innerHTML = '<h1 id="transition">Passe para o primeiro jogador</p>';
    startButtom.setAttribute('style', 'display: none;');
    let show = document.getElementById('show');
    show.setAttribute('style', 'display: flex;');
    show.onclick = function (){
        if (count - 1 < finalList[1].length){
            main.innerHTML = '';
            main.innerHTML = `<div class = "divJogador"><p id = "jogador" class = "jogador" >Jogador ${count}</p></div>
            <div class="legend"><p id="ast">*</p><p class="text">Lugar</p><p id="ast">*</p></div>
            <div class = "divCenario"><p class = "cenario"  id = "cenario" style = "visibility: hidden;">${finalList[0][0]}</p></div>
            <div class="legend"><p id="ast">*</p><p class="text">Fun????o</p><p id="ast">*</p></div>
            <div class = "divRole"><p class = "role"  id = "secretId" style = "visibility: hidden;">${finalList[1][count-1]}</p></div>`;
            main.setAttribute('style', 'display: block;');     
            show.setAttribute('style', 'display: none;');
            let showSecret = document.getElementById('showSecret');
            showSecret.setAttribute('style', 'display: block;');
            showSecret.onclick = function () {
                let role = document.getElementById('secretId');
                role.setAttribute('style', 'visibility: visible;');
                let cenario = document.getElementById('cenario');
                if (role.innerHTML == 'eeta charlat??ozin safad'){
                    cenario.innerHTML = `Descubra o lugar!`;
                }else{
                    cenario.innerHTML = `${finalList[0][0]}`;
                }
                cenario.setAttribute('style', 'visibility: visible;');
                showSecret.setAttribute('style', 'display: none;');
                show.setAttribute('style', 'display: block;');
                count ++
            };
        }else {
            main.innerHTML = `<div class="players"><h2>Jogadores:</h2></div><div class="wrapper"><span class="minus" id="minusPlayer">-</span><span class="num" id="nJogadores">${nPlayers}</span><span class="plus" id="plusPlayer">+</span></div><div class="players1"><h2>Charlatos:</h2></div><div class="wrapper"><span class="minus1" id="minusChar">-</span><span class="num1" id="nImpostores">${nChar}</span><span class="plus1" id="plusChar">+</span></div>`
            show.setAttribute('style', 'display: none;');
            startButtom.setAttribute('style', 'display: block;')
            selectNPlayers();
            buttons(nPlayers, nChar);
            count = 1;
        }
    }
}

//Randomize and returns the scenario

function selectScenario(nPessoas, nImpostores) {
    const situations = [
        ['Karaoke', ['Cantor', 'T??mido', 'Desafinado', 'Bartender', 'T??cnico de ??udio', 'Dan??arino', 'Seguran??a', 'Gerente', 'Dono', 'Vendedor de milho']],
        ['Praia', ['Vendedor de picol??', 'Salva-Vidas', 'Gringo', 'Fot??grafo', 'Surfista', 'Vendedor de mi??angas',' Dono do quiosque', 'Esportista', 'Pescador', 'Morador local']],
        ['Zool??gico', ['Veterin??rio', 'Jardineiro', 'Bi??logo', 'Funcion??rio', 'Vendedor de souvenir', 'Cambista', 'Guia', 'Visitante', 'Fot??grafo', 'Vendedor de ??gua']],
        ['Bar', ['Gerente', 'Gar??om', 'Caixa', 'Universit??rio', 'Casal apaixonado', 'N??ia', 'Vendedor de bala', 'Fumante sem isqueiro', 'Bo??mio', 'Truqueiro']],
        ['Academia', ['S??cio', 'Pregui??oso', 'Rato de academia', 'Influenciadora', 'Recepcionista', 'Personal galinha', 'Aluna de Zumba', 'Fisiculturista', 'Lutador', 'Fornecedor']],
        ['Balada', ['Mixologista/Bartender', 'Gerente', 'Drogado', 'Fumante', 'DJ', 'H??terotop', 'Dan??arino', 'Vendedor de Hot Dog', 'Eletricista', 'Faxineiro']],
        ['Cinema', ['Vendedor de pipoca', 'Vendedor da bilheteria', 'Cinegrafista', 'Casal apaixonado', 'Pessoa que ri alto', 'Pessoa que dorme', 'Pessoa que fofoca', 'Pessoa emocionada', 'Cosplay', 'Eletricista']],
        ['Clube', ['Treinador', 'Massagista', 'Salva-Vidas', 'Milion??rio', 'S??cio', 'Esportista', 'Jardineiro', 'Recepcionista', 'Cansado', 'Crian??a de f??rias']],
        ['Cruzeiro', ['Monitor', 'Capit??o', 'Pai/M??e de primeira viagem', 'Chef', 'Bartender', 'Nauseado', 'Jogador compulsivo', 'A doida do protetor solar', 'Salva-Vidas', 'Baladeiro']],
        ['Delegacia', ['B??bado', 'Ladr??o', 'Delegado', 'Preso por roubo', 'Preso por uma paranga', 'V??tima', 'Familiar da v??tima', 'Advogado', 'Faxineiro', 'Policial']],
        ['Estacionamento', ['Manobrista', 'Cobrador','Dono', 'Funcion??rio', 'O que perdeu o ticket', 'Impaciente', 'Fumante', 'Perderam seu carro', 'Gerente', 'B??bado']],
        ['Faculdade', ['Bixo', 'Professora', 'Traficantezinho', 'Faxineiro', 'Vendedora da cantina', 'Diretor', 'Bibliotec??ria', 'Veterano que n??o se forma', 'Atleticano chato', 'Seguran??a']],
        ['Farmacia', ['Caixa', 'Farmac??utico', 'Cliente sem atestado', 'Cliente comprando camisinha', 'Idoso', 'Hipocondr??aco', 'Repositor de g??ndola', 'Estagi??ria', 'Maconheiro comprando col??rio', 'O que compra teste de gravides']],
        ['Festival', ['Perdido', 'Good Vibes', 'Artista', 'F?? de carteirinha', 'Fumante', 'Faxineiro', 'Seguran??a', 'Vendedor', 'Cambista', 'Caixa ambulante']],
        ['Hospital', ['M??dico', 'Enfermeiro', 'Cirurgi??o', 'Recepcionista', 'Hipocondr??aco', 'O Doente', 'O louco', 'A madre', 'Anestesista', 'O acidentado']],
        ['Mec??nica', ['Mec??nico', 'Dono', 'S??cio', 'Ajudante', 'Cliente', 'Cliente irritado', 'Cliente m??o de vaca', 'O desocupado', 'Vizinho', 'Fornecedor de pe??as']],
        ['Metr??', ['Artista', 'Seguran??a', 'Bilheteiro', 'O que pulou a catraca', 'Executivo', 'B??bado', 'Vendedor ambulante', 'Passageiro', 'Sem m??scara', 'Atrasado']],
        ['Padaria', ['Padeiro', 'B??bado', 'Caixa', 'O que compra coxa creme', 'Cliente virado', 'Chapeiro', 'Balconista', 'Eletricista', 'Vigil??ncia sanit??ria', 'Vizinho']],
        ['Parque', ['Skatista', 'Seguran??a noturno', 'Vendedor de ??gua de c??co', 'Senhora fazendo cooper', 'Boleiro', 'Jogador de Basquete', 'Guarda Civil Municipal', 'Casal apaixonado', 'Jardineiro', 'N??ia']],
        ['Posto de gasolina', ['Frentista', 'B??bado', 'Vendedor da conveni??ncia', 'Mec??nico', 'Gerente', 'Caminhoneiro', 'Cliente', 'Turista de ??nibus', 'Motoboy', 'Ciclista']],
        ['Restaurante', ['Chef', 'Bartender', 'Recepcionista', 'Caixa', 'Influenciadora', 'Vegetariano', 'Cliente (que foge da conta)', 'Inspetor sanit??rio', 'Casal que briga', 'Cliente que reclama']],
        ['Rua', ['CET', 'Policial', 'Morador de rua', 'Pedestre', 'Corredor', 'Motoboy', 'Uber', 'Skatista', 'Gari', 'Panfleteiro']],
        ['Supermercado', ['Estoquista', 'Caixa', 'Jardineiro da loja', 'Gerente', 'Cliente', 'Menores comprando bebida', 'Anunciante', 'Crian??a perdida', 'Louco por promo????o', 'Empacotador']],
        ['Teatro', ['Ator principal', 'Diretor', 'Espectador', 'Vendedor da bilheteria', 'Figurinista', 'Familiar do ator', 'Seguran??a', 'Vendedor de pipoca', 'Coadjuvante', 'Espectador estudante']],
        ['Banheiro da balada', ['Drogado', 'Apertado para fazer xixi', 'O que est?? passando mal', 'O que puxa assunto', 'O que manda mensagem pra ex', 'Briguento', 'Faxineiro', 'Beijoqueiro', 'Nunca sai da fila', 'Funcion??rio descansando']],
        ['Fazenda', ['Fazendeiro', 'Agroboy', 'Vaqueiro', 'Lenhador', 'Veterin??rio', 'Propriet??rio', 'Fornecedor de adubo', 'Caseiro', 'Vizinho', 'F?? de sertanejo']],
        ['Cafeteria', ['Caixa', 'Gar??om', 'Confeiteiro', 'Executivo', 'Cr??tico gastron??mico', 'Cliente', 'Blogueira', 'Pessoa atrasada', 'Fofoqueira', 'Universit??rio']],
        ['Biblioteca', ['Bibliotec??rio', 'Casal apaixonado','Estudante', 'O que l?? em voz alta', 'Faxineiro', 'Turista', 'Escritor', 'F?? do escritor', 'Intelectual', 'Curador de livros']],
        ['Igreja', ['Padre', 'Freira', 'Crente', 'Crian??a', 'Noiva', 'Noivo', 'Emocionado', 'Turista', 'Fot??grafo', 'O que se confessa']],
        ['Circo', ['Palha??o', 'M??gico', 'Malabarista', 'Trapezista', 'Vendedor da bilheteria', 'Crian??a', 'Impressionado', 'Pai/M??e de crian??a', 'O atrasado', 'Hippie']],
        ['Parque de Divers??es', ['Vendedor de algod??o doce', 'Primeiro date', 'Funcion??rio', 'Nauseado', 'Palha??o', 'Mec??nico', 'Crian??a', 'Adolescente entediado', 'Pai animado', 'B??bado']],
        ['Festa a Fantasia', ['Bartender', 'Promoter', 'O barrado', 'Bruxa', 'Elvis Presley', 'Diabo', 'Sem fantasia', 'Pikachu', 'Hulk', 'Marilyn Monroe', 'A anja']],
        ['Casa de Strip', ['A dan??arina', 'Milion??rio', 'B??bado', 'Virgem', 'Gerente', 'Curioso', 'Rec??m separado', 'noiva', 'O tarado', 'DJ']]        
        ['Ch??cara do Junho', ['Biel', 'Rafa', 'Felps', 'Lo', 'Jojozinha', 'Junior', 'Li', 'Gui', 'Mu', 'Paulin']],
    ];
 


    //console.log(situations[0].length)
    let n = Math.floor(Math.random() * situations.length);
    let local = situations[n][0];
    let persons = situations[n][1];
    let personList = [[], []]
    personList[0].push(local)
    let i = 0
    while (i < (nPessoas - nImpostores)) {
        let m = Math.floor(Math.random() * persons.length);
        let person = persons[m];
        persons.splice(m, 1);
        personList[1].push(person);
        i = i + 1
    }
    return personList;
};

//Add the charlatans

function pushImpostor(list, nImpostores) {
    let i = 0;
    while (i < nImpostores) {
        list[1].push('eeta charlat??ozin safad');
        const main = document.getElementById('template');
        main.innerHTML = '';
        i = i + 1;
    }
    return list;
}

//Shuffle the characters

function shuffle(array) {
    const newArray = [...array]
    const length = newArray.length
  
    for (let start = 0; start < length; start++) {
      const randomPosition = Math.floor((newArray.length - start) * Math.random())
      const randomItem = newArray.splice(randomPosition, 1)
  
      newArray.push(...randomItem)
    }
    console.log(array);
    return newArray
}