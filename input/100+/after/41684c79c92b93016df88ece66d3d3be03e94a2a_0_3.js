function() {
		var derivaEpsilon = !Utilitarios.nuloOuIndefinido(this.fornecerFirsts()["&"]);
		if (!derivaEpsilon) {
			this.producoes.paraCada(function(producao, indiceDaProducao) {
				if (producao.length === 1 && producao[0].epsilon()) {
					derivaEpsilon = true;
					return;
				}
			});
		}
		if (!derivaEpsilon && !this.verificandoSeDerivaEpsilon) {
			this.verificandoSeDerivaEpsilon = true;
			this.producoes.paraCada(function(producao, indiceDaProducao) {
				var producaoDerivaEpsilon = true;
				producao.paraCada(function(simboloDaProducao, indiceDoSimboloDaProducao) {
					if (!simboloDaProducao.derivaEpsilonEmZeroOuMaisPassos()) {
						producaoDerivaEpsilon = false;
						return;
					}
				});
				if (producaoDerivaEpsilon) {
					derivaEpsilon = true;
					return;
				}
			});
			this.verificandoSeDerivaEpsilon = false;
		}
		return derivaEpsilon;
	}