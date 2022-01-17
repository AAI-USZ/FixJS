function(simbolo) {
		Utilitarios.assegureQue(Utilitarios.instanciaDe(simbolo, String));
		this.simbolo = simbolo;
		this.producoes = [];
		this.firsts = null;
		this.follows = null;
		this.recursivoAEsquerda = false;
		this.receptoresDosFirsts = {};
	}