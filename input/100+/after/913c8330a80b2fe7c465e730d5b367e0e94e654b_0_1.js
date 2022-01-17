function() {
		var sentenca = ControleDaVisao.elemento("campoSentenca").value;
		var resposta = ControleDoModelo.reconhecerSentenca(ControleDaVisao.gramaticaSelecionada, sentenca);
		var resultadoDoReconhecimento = ControleDaVisao.elemento("resultadoDoReconhecimento");
		if (sentenca === "") {
			sentenca = "ε";
		}
		if (resposta.reconheceu) {
			resultadoDoReconhecimento.setAttribute("class", "sucesso");
			resultadoDoReconhecimento.innerHTML = "A sentenca <strong>" + sentenca + "</strong> foi reconhecida.";
		} else {
			resultadoDoReconhecimento.setAttribute("class", "fracasso");
			if (resposta.tabelaDeParsingDeterministica) {
				resultadoDoReconhecimento.innerHTML = "A sentença <strong>" + sentenca + 
					"</strong> não foi reconhecida. Era esperado o símbolo <strong>" + resposta.simboloEsperado + 
					"</strong>, mas o símbolo recebido foi <strong>" + resposta.simboloRecebido + 
					"</strong>.";
			} else {
				resultadoDoReconhecimento.setAttribute("class", "informativo");
				resultadoDoReconhecimento.innerHTML = "Não é possível efetuar o reconhecimento da sentença pois a gramática não pode ser análisada pela técnica LL(1).";
			}
		}
	}