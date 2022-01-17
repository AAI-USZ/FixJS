function(receptorDosFirsts) {
		if (Utilitarios.nulo(this.firsts)) {
			this.firsts = {};
			this.producoes.paraCada(function(producao, indiceDaProducao) {
				var indiceDoSimbolo = 0;
				var proximoSimbolo = producao[indiceDoSimbolo];
					var anteriorDerivaEpsilon = false;
					var firstsDoProximoSimbolo = {};
					do {
						firstsDoProximoSimbolo = proximoSimbolo.calcularFirsts(this);
						anteriorDerivaEpsilon = proximoSimbolo.derivaEpsilonEmZeroOuMaisPassos();
						firstsDoProximoSimbolo.paraCada(function(novoFirst, chaveDoNovoFirst) {
							if (!novoFirst.epsilon() || proximoSimbolo.epsilon()) {
								this.firsts[chaveDoNovoFirst] = novoFirst;
							}
						}, this);
						proximoSimbolo = producao[++indiceDoSimbolo];
					} while (anteriorDerivaEpsilon && indiceDoSimbolo < producao.length);
					if (anteriorDerivaEpsilon && indiceDoSimbolo === producao.length) {
						this.firsts["&"] = firstsDoProximoSimbolo["&"];
					}
			}, this);
			this.propagarFirsts();
		} else {
			this.receptoresDosFirsts[receptorDosFirsts.simbolo] = receptorDosFirsts;
		}
		return this.firsts;
	}