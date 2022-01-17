function(eventid, effect, relayVar) {
		var actives = [];
		if (!effect && selfB.effect) effect = selfB.effect;
		for (var i=0; i<selfB.sides.length;i++) {
			var side = selfB.sides[i];
			for (var j=0; j<side.active.length; j++) {
				actives.push(side.active[j]);
			}
		}
		actives.sort(function(a, b) {
			if (b.stats.spe - a.stats.spe) {
				return b.stats.spe - a.stats.spe;
			}
			return Math.random()-0.5;
		});
		for (var i=0; i<actives.length; i++) {
			selfB.runEvent(eventid, actives[i], null, effect, relayVar);
		}
	}