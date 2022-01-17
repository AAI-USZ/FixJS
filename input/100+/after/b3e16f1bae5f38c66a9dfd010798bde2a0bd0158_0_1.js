function(key, value) {
			if(character[key] == null) {
				character[key] = {
					skill: {
						damage: 0,
						critical_chance: 0,
						critical_damage: 0
					},
					belt: {},
					boots: {},
					braces: {},
					chest: {},
					glovers: {},
					helm: {},
					pants: {},
					shoulders: {},
					amulet: {},
					ring_1: {},
					ring_2: {},
					weapon_1: {},
					weapon_2: {}
				};

				setCookie('character' + key, Base64.encode(JSON.stringify(character[key])));
			}
			else
				character[key] = JSON.parse(Base64.decode(character[key]));
		}