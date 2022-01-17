function(basePower, user, target, move) {
			if (user.template.species === 'Giratina' && (move.type === 'Ghost' || move.type === 'Dragon')) {
				return basePower * 1.2;
			}
		}