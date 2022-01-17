function(producao, indiceDaProducao) {
				var indice = 0;
				var firstsAvaliados = [];
				do {
					producao[indice].fornecerFirsts().paraCada(function(firstDaProducao, simboloDoFirstDaProducao) {
						if (!firstDaProducao.epsilon() && !firstsAvaliados.contem(simboloDoFirstDaProducao)) {
							firstsAvaliados.push(simboloDoFirstDaProducao);
							this.tabelaDeParsing[simboloDoNaoTerminal][simboloDoFirstDaProducao].push(producao); 
						} 
					}, this);
				} while (producao[indice++].derivaEpsilonEmZeroOuMaisPassos() && indice < producao.length);
				if (indice === producao.length && producao[--indice].derivaEpsilonEmZeroOuMaisPassos()) {
					naoTerminal.fornecerFollows().paraCada(function(followDoNaoTerminal, simboloDoFollowDoNaoTerminal) {
						this.tabelaDeParsing[simboloDoNaoTerminal][simboloDoFollowDoNaoTerminal].push(producao);
					}, this);
				}
			}