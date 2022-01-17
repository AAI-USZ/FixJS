function(producao, indiceDaProducao) {
				var indiceDoSimboloDaProducao = 0;
				while (indiceDoSimboloDaProducao < producao.length) {
					var simboloAtualDaProducao = producao[indiceDoSimboloDaProducao];
					if (++indiceDoSimboloDaProducao < producao.length && Utilitarios.instanciaDe(simboloAtualDaProducao, NaoTerminal)) {
						var proximoSimboloDaProducao = producao[indiceDoSimboloDaProducao];
						if (!proximoSimboloDaProducao.epsilon()) {
							simboloAtualDaProducao.adicionarFollows(proximoSimboloDaProducao.fornecerFirsts());
						}
					}
				}
			}