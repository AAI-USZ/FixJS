function(damage, attacker, defender, effect) {
			var GossamerWingUsers = {"Butterfree":1, "Masquerain":1, "Beautifly":1, "Mothim":1};
			if (GossamerWingUsers[defender.template.species]) {
				if (effect && effect.id === 'stealthrock') {
					return damage / 2;
				}
			}
		}