function() {
		if (!this.recursivoAEsquerda) {
			var recursivoAEsquerda = false;
			this.producoes.paraCada(function(producao, indiceDaProducao) {
				var indiceDoSimboloDaProducao = 0;
				var antecessoresDerivamEpsilon = true;
				while (indiceDoSimboloDaProducao < producao.length && antecessoresDerivamEpsilon && !recursivoAEsquerda) {
					var simboloDaProducao = producao[indiceDoSimboloDaProducao++];
					if (simboloDaProducao !== this) {
						antecessoresDerivamEpsilon = simboloDaProducao.derivaEpsilonEmZeroOuMaisPassos();
					} else {
						recursivoAEsquerda = true;
						return;
					}
				}
			}, this);
			this.recursivoAEsquerda = recursivoAEsquerda;
		}
		return this.recursivoAEsquerda;
	}