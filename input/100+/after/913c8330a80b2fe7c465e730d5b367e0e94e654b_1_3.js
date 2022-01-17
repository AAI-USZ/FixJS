function(producao, indiceDaProducao) {
				var indiceDoSimbolo = 0;
				var proximoSimbolo = producao[indiceDoSimbolo];
//				if (proximoSimbolo !== this) {
					var anteriorDerivaEpsilon = false;
					var firstsDoProximoSimbolo = {};
					do {
						firstsDoProximoSimbolo = proximoSimbolo.calcularFirsts(this);
						anteriorDerivaEpsilon = proximoSimbolo.derivaEpsilonEmUmPasso();
						firstsDoProximoSimbolo.paraCada(function(novoFirst, chaveDoNovoFirst) {
							if (!novoFirst.epsilon() || proximoSimbolo.epsilon()) {
								this.firsts[chaveDoNovoFirst] = novoFirst;
							}
						}, this);
						proximoSimbolo = producao[++indiceDoSimbolo];
					} while ((anteriorDerivaEpsilon) && indiceDoSimbolo < producao.length);
					if (anteriorDerivaEpsilon && indiceDoSimbolo === producao.length) {
						this.firsts["&"] = firstsDoProximoSimbolo["&"];
					}
//				}
			}