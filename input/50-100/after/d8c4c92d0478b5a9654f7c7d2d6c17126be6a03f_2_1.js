function(basePower, attacker, defender, move) {
			var GossamerWingUsers = {"Butterfree":1, "Masquerain":1, "Beautifly":1, "Mothim":1};
			if (GossamerWingUsers[defender.template.species]) {
				if (move.type === 'Rock' || move.type === 'Electric' || move.type === 'Ice') {
					return basePower / 2;
				}
			}
		}