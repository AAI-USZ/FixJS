function() {
		var derivaEpsilon = false;
		this.producoes.paraCada(function(producao, indiceDaProducao) {
			if (producao.length === 1 && producao[0].epsilon()) {
				derivaEpsilon = true;
				return;
			}
		});
		return derivaEpsilon;
	}