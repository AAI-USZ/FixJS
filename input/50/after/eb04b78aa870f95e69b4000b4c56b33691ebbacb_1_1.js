function isPasswordValid() {
		var mdpkey = passwordKey();
		var mdp = localStorage[mdpkey];
		var mdpIsValid = mdp && (mdp.length == 32);
		return mdpIsValid;
	}