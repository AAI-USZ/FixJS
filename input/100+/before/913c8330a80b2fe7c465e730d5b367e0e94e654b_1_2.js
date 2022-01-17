function(firstDaProducao, simboloDoFirstDaProducao) {
					if (!firstDaProducao.epsilon()) {
						this.tabelaDeParsing[simboloDoNaoTerminal][simboloDoFirstDaProducao].push(producao); 
					} else {
						naoTerminal.fornecerFollows().paraCada(function(followDoNaoTerminal, simboloDoFollowDoNaoTerminal) {
							this.tabelaDeParsing[simboloDoNaoTerminal][simboloDoFollowDoNaoTerminal].push(producao);
						}, this);
					}
				}