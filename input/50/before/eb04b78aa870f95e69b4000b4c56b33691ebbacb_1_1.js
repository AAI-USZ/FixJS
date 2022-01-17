function isPasswordValid () {
		var mdpkey = 'troll.' + chrall.playerId() + '.mdp';
		var mdp = localStorage[mdpkey];
		var mdpIsValid = mdp && (mdp.length == 32);
		return mdpIsValid;
	}