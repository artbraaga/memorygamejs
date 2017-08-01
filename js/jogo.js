var cartas = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15");
var tabuleiroBool = new Array("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
var tabuleiroBoolAux = new Array(12)
var numeroDeCliques = 0;
var acertos = 0;
var cartaAnterior = -1;
var cartaAtual = -1;

embaralhaTabuleiro();


function embaralhaTabuleiro() {
    r = -1;
    for (i = 0; i < 15; i++) {
    r = Math.round(Math.random() * (cartas.length - 1));
    aux = cartas[r];
    cartas[r] = cartas[i];
    cartas[i] = aux;
    }
}


function verificarCarta(indice) {
    if (tabuleiroBool[ indice ] == 0) {
      tabuleiroBool[indice] = 1;
      numeroDeCliques++;

      carta = parseInt(cartas[parseInt(indice)]);
      visualizarCarta(carta, indice);

      if (numeroDeCliques % 2 != 0) {
      cartaAnterior = indice;
    } else if ((cartas[indice] % 8) == (cartas[cartaAnterior] % 8)) {
      acertos++;
      $('#msg').html('ACERTOU!');
      setTimeout(function(){
        $('#msg').html('...');
        }, 1000);
      if (acertos == cartas.length / 2) {
      $('#msg').html("*** Fim de Jogo! *** Você errou " + ((numeroDeCliques / 2) - acertos) + " vez(es).");

	}
    } else { // Errou.
      cartaAtual = indice;
      $('#msg').html('ERROU');
      // document.getElementById("msg").value = "ERROU!";


      trava(1);
      setTimeout("trava(0);", 1000 );

      setTimeout("esconderCarta(cartaAnterior);", 1000);
      setTimeout("esconderCarta(cartaAtual);", 1000);
      setTimeout(function(){
        $('#msg').html('...');
      }, 1000);
  		}
	  }
     return;
}

function visualizarCarta(carta, indice) {
	url = "img/carta" + (carta % 8) + ".png";
	document.campo[indice].src = url;
}

function esconderCarta(indice) {
	document.campo[indice].src = "./img/carta_virada.png";
	tabuleiroBool[indice] = 0;
}

function novoJogo() {
	acertos = 0;
	numeroDeCliques = 0;
	indiceBotaoClicado = -1;

	for (i = 0; i <cartas.length; i++) {
    esconderCarta(i);
    }

    embaralhaTabuleiro();
    $('#msg').html('Novo jogo iniciado!');
    // document.getElementById("msg").value = "Novo jogo iniciado!";

    return;
    }

function trava(flag) {
	if (flag == 1) {
	for (i = 0; i < tabuleiroBool.length; i++) {
	tabuleiroBoolAux[i] = tabuleiroBool[i];
	tabuleiroBool[i] = 1;
}

	}else if (flag == 0) {
	for (i = 0; i < tabuleiroBool.length; i++) {
	tabuleiroBool[i] = tabuleiroBoolAux[i];
    }
}
    return;
}
