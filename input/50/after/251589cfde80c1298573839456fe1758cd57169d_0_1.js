function(basePower, user, target, move) {
			if (user.template.num === 487 && (move.type === 'Ghost' || move.type === 'Dragon')) {
				return basePower * 1.2;
			}
		}