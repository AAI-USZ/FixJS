function(side) {
		if (side.battle.getFormat().team === 'random') {
			return this.randomTeam(side);
		} else if (side.user && side.user.team && side.user.team !== 'random') {
			return side.user.team;
		} else {
			return this.randomTeam(side);
		}
	}