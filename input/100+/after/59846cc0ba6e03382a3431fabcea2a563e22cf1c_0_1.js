function BattleSide(user, battle, n, team) {
	var selfB = battle;
	var selfS = this;

	this.battle = battle;
	this.n = n;
	this.user = user;
	this.name = user.name;
	this.pokemon = [];
	this.pokemonLeft = 0;
	this.active = [null];
	this.decision = null;
	this.foe = null;
	this.sideConditions = {};

	this.id = (n?'p2':'p1');

	this.team = selfB.getTeam(this, team);
	for (var i=0; i<this.team.length && i<6; i++) {
		//console.log("NEW POKEMON: "+(this.team[i]?this.team[i].name:'[unidentified]'));
		this.pokemon.push(new BattlePokemon(this.team[i], this));
	}
	this.pokemonLeft = this.pokemon.length;
	for (var i=0; i<this.pokemon.length; i++) {
		this.pokemon[i].position = i;
	}

	this.toString = function() {
		return selfS.id+': '+selfS.name;
	};

	this.getData = function() {
		var data = {
			name: selfS.name,
			pokemon: []
		};
		for (var i=0; i<selfS.pokemon.length; i++) {
			var pokemon = selfS.pokemon[i];
			data.pokemon.push({
				ident: pokemon.fullname,
				details: pokemon.details,
				condition: pokemon.getHealth(true),
				active: (pokemon.position < pokemon.side.active.length),
				moves: pokemon.moves,
				ability: pokemon.ability,
				item: pokemon.item
			});
		}
		return data;
	};

	this.randomActive = function() {
		var i = Math.floor(Math.random() * selfS.active.length);
		return selfS.active[i];
	};

	this.addSideCondition = function(status, source, sourceEffect) {
		status = selfB.getEffect(status);
		if (selfS.sideConditions[status.id]) {
			selfB.singleEvent('Restart', status, selfS.sideConditions[status.id], selfS, source, sourceEffect);
			return false;
		}
		selfS.sideConditions[status.id] = {id: status.id};
		selfS.sideConditions[status.id].target = selfS;
		if (source) {
			selfS.sideConditions[status.id].source = source;
			selfS.sideConditions[status.id].sourcePosition = source.position;
		}
		if (status.duration) {
			selfS.sideConditions[status.id].duration = status.duration;
		}
		if (status.durationCallback) {
			selfS.sideConditions[status.id].duration = status.durationCallback.call(selfB, selfS, source, sourceEffect);
		}
		if (!selfB.singleEvent('Start', status, selfS.sideConditions[status.id], selfS, source, sourceEffect)) {
			delete selfS.sideConditions[status.id];
			return false;
		}
		selfB.update();
		return true;
	};
	this.getSideCondition = function(status) {
		status = selfB.getEffect(status);
		if (!selfS.sideConditions[status.id]) return null;
		return status;
	};
	this.removeSideCondition = function(status) {
		status = selfB.getEffect(status);
		if (!selfS.sideConditions[status.id]) return false;
		selfB.singleEvent('End', status, selfS.sideConditions[status.id], selfS);
		delete selfS.sideConditions[status.id];
		selfB.update();
		return true;
	};
	this.emitUpdate = function(update) {
		if (selfS.user) {
			update.room = selfB.roomid;
			selfS.user.emit('update', update);
		}
	};
	this.destroy = function() {
		// deallocate ourself

		// deallocate children and get rid of references to them
		for (var i=0; i<selfS.pokemon.length; i++) {
			if (selfS.pokemon[i]) selfS.pokemon[i].destroy();
			selfS.pokemon[i] = null;
		}
		selfS.pokemon = null;
		for (var i=0; i<selfS.active.length; i++) {
			selfS.active[i] = null;
		}
		selfS.active = null;

		if (selfS.decision) {
			delete selfS.decision.side;
			delete selfS.decision.pokemon;
			delete selfS.decision.user;
		}
		selfS.decision = null;

		// make sure no user is referencing us
		if (selfS.user) {
			delete selfS.user.sides[selfB.roomid];
		}
		selfS.user = null;

		// get rid of some possibly-circular references
		selfS.battle = null;
		selfS.foe = null;
		selfB = null;

		selfS = null;
	};
}