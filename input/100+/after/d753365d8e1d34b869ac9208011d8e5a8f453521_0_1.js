function BattlePokemon(set, side) {
	var selfB = side.battle;
	var selfS = side;
	var selfP = this;
	this.side = side;
	if (typeof set === 'string') set = {name: set};

	this.baseSet = set;
	this.set = this.baseSet;

	this.baseTemplate = selfB.getTemplate(set.species || set.name);
	if (!this.baseTemplate.exists) {
		selfB.debug('Unidentified species: '+this.species);
		this.baseTemplate = selfB.getTemplate(this.species);
	}
	this.species = this.baseTemplate.species;
	if (set.name === set.species || !set.name || !set.species) {
		set.name = this.species;
	}
	this.name = (set.name || set.species || 'Bulbasaur').substr(0,20);
	this.speciesid = toId(this.species);
	this.template = this.baseTemplate;
	this.moves = [];
	this.baseMoves = this.moves;
	this.movepp = {};
	this.moveset = [];
	this.baseMoveset = [];
	this.trapped = false;

	this.level = clampIntRange(set.level || 100, 1, 100);
	this.hp = 0;
	this.maxhp = 100;
	var genders = {M:'M',F:'F'};
	this.gender = this.template.gender || genders[set.gender] || (Math.random()*2<1?'M':'F');
	if (this.gender === 'N') this.gender = '';
	this.happiness = typeof set.happiness === 'number' ? clampIntRange(set.happiness, 0, 255) : 255;

	this.fullname = this.side.id + ': ' + this.name;
	this.details = this.species + (this.level==100?'':', L'+this.level) + (this.gender===''?'':', '+this.gender) + (this.set.shiny?', shiny':'');

	this.id = this.fullname; // shouldn't really be used anywhere
	this.illusion = null;

	this.fainted = false;
	this.lastItem = '';
	this.status = '';
	this.statusData = {};
	this.volatiles = {};
	this.position = 0;
	this.lastMove = '';
	this.lastDamage = 0;
	this.lastAttackedBy = null;
	this.movedThisTurn = false;
	this.usedItemThisTurn = false;
	this.newlySwitched = false;
	this.beingCalledBack = false;
	this.isActive = false;
	this.isStarted = false; // has this pokemon's Start events run yet?

	this.transformed = false;
	this.negateImmunity = {};

	this.height = this.template.height;
	this.heightm = this.template.heightm;
	this.weight = this.template.weight;
	this.weightkg = this.template.weightkg;

	this.ignore = {};
	this.duringMove = false;

	this.baseAbility = toId(set.ability);
	this.ability = this.baseAbility;
	this.item = toId(set.item);
	this.abilityData = {id: this.ability};
	this.itemData = {id: this.item};

	this.hpType = 'Dark';
	this.hpPower = 70;

	if (this.set.moves) {
		for (var i=0; i<this.set.moves.length; i++) {
			var move = selfB.getMove(this.set.moves[i]);
			if (move.id === 'HiddenPower') {
				this.hpType = move.type;
			}
			this.baseMoveset.push({
				move: move.name,
				id: move.id,
				pp: (move.noPPBoosts ? move.pp : move.pp * 8/5),
				maxpp: (move.noPPBoosts ? move.pp : move.pp * 8/5),
				disabled: false,
				used: false
			});
			this.moves.push(toId(move.name));
		}
	}

	if (!this.set.evs) {
		this.set.evs = {
			hp: 84,
			atk: 84,
			def: 84,
			spa: 84,
			spd: 84,
			spe: 84
		};
	}
	if (!this.set.ivs) {
		this.set.ivs = {
			hp: 31,
			atk: 31,
			def: 31,
			spa: 31,
			spd: 31,
			spe: 31
		};
	}
	var stats = { hp: 31, atk: 31, def: 31, spe: 31, spa: 31, spd: 31};
	for (var i in stats) {
		if (!this.set.evs[i]) this.set.evs[i] = 0;
		if (!this.set.ivs[i] && this.set.ivs[i] !== 0) this.set.ivs[i] = 31;
	}
	for (var i in this.set.evs) {
		this.set.evs[i] = clampIntRange(this.set.evs[i], 0, 255);
	}
	for (var i in this.set.ivs) {
		this.set.ivs[i] = clampIntRange(this.set.ivs[i], 0, 31);
	}

	var hpTypeX = 0, hpPowerX = 0;
	var i = 1;
	for (var s in stats) {
		hpTypeX += i * (this.set.ivs[s] % 2);
		hpPowerX += i * (Math.floor(this.set.ivs[s] / 2) % 2);
		i *= 2;
	}
	var hpTypes = ['Fighting','Flying','Poison','Ground','Rock','Bug','Ghost','Steel','Fire','Water','Grass','Electric','Psychic','Ice','Dragon','Dark'];
	this.hpType = hpTypes[Math.floor(hpTypeX * 15 / 63)];
	this.hpPower = Math.floor(hpPowerX * 40 / 63) + 30;

	this.stats = {
		hp: 0,
		atk: 0,
		def: 0,
		spa: 0,
		spd: 0,
		spe: 0
	};
	this.boosts = {
		atk: 0,
		def: 0,
		spa: 0,
		spd: 0,
		spe: 0,
		accuracy: 0,
		evasion: 0
	};
	this.baseBoosts = {
		atk: 0,
		def: 0,
		spa: 0,
		spd: 0,
		spe: 0,
		accuracy: 0,
		evasion: 0
	};
	this.unboostedStats = {
		atk: 0,
		def: 0,
		spa: 0,
		spd: 0,
		spe: 0,
		accuracy: 0,
		evasion: 0
	};
	this.baseStats = this.template.baseStats;
	this.bst = 0;
	for (var i in this.baseStats) {
		this.bst += this.baseStats[i];
	}
	this.bst = this.bst || 10;
	this.types = this.baseTemplate.types;

	this.stats['hp'] = Math.floor(Math.floor(2*selfP.baseStats['hp']+selfP.set.ivs['hp']+Math.floor(selfP.set.evs['hp']/4)+100)*selfP.level / 100 + 10);
	if (this.baseStats['hp'] === 1) this.stats['hp'] = 1; // shedinja
	this.unboostedStats['hp'] = this.stats['hp'];
	this.maxhp = this.stats['hp'];
	this.hp = this.hp || this.maxhp;

	this.toString = function() {
		if (selfP.illusion) return selfP.illusion.fullname;
		return selfP.fullname;
	};
	this.getDetails = function() {
		if (selfP.illusion) return selfP.illusion.details + ' | ' + selfP.getHealth();
		return selfP.details + ' | ' + selfP.getHealth();
	};

	this.update = function(init) {
		selfP.baseStats = selfP.template.baseStats;
		// reset for Light Metal etc
		selfP.weightkg = selfP.template.weightkg;
		// reset for Forecast etc
		selfP.types = selfP.template.types;
		// reset for diabled moves
		selfP.disabledMoves = {};
		selfP.negateImmunity = {};
		selfP.trapped = false;
		// reset for ignore settings
		selfP.ignore = {};
		for (var i in selfP.moveset) {
			if (selfP.moveset[i]) selfP.moveset[i].disabled = false;
		}
		for (var i in selfP.stats) {
			var stat = selfP.baseStats[i];
			/* if (selfP.set.bstscale && selfP.bst > 520 * 1.06) {
				stat *= 520 / selfP.bst * 1.06; // stat scaling in progress
			}
			if (selfP.set.bstscale && selfP.bst < 520 * 0.94) {
				stat *= 520 / selfP.bst * 0.94; // stat scaling in progress
			} */
			if (i==='hp') {
				continue;
			} else {
				selfP.unboostedStats[i] = Math.floor(Math.floor(2*stat+selfP.set.ivs[i]+Math.floor(selfP.set.evs[i]/4))*selfP.level / 100 + 5);
			}
			selfP.stats[i] = selfP.unboostedStats[i];
		}
		for (var i in selfP.baseBoosts) {
			selfP.boosts[i] = selfP.baseBoosts[i];
		}
		selfB.natureModify(selfP.stats, selfP.set.nature);
		for (var i in selfP.stats) {
			selfP.stats[i] = Math.floor(selfP.stats[i]);
		}
		if (init) return;

		selfB.runEvent('ModifyStats', selfP, null, null, selfP.stats);

		for (var i in selfP.stats) {
			selfP.stats[i] = Math.floor(selfP.stats[i]);
			selfP.unboostedStats[i] = selfP.stats[i];
		}

		var boostTable = [1,1.5,2,2.5,3,3.5,4];
		for (i in selfP.boosts) {
			if (selfP.boosts[i] > 6) selfP.boosts[i] = 6;
			if (selfP.boosts[i] < -6) selfP.boosts[i] = -6;
			if (i === 'accuracy' || i === 'evasion' || i === 'hp') continue; // hp should never happen
			if (selfP.boosts[i] >= 0) {
				selfP.stats[i] = Math.floor(selfP.unboostedStats[i] * boostTable[selfP.boosts[i]]);
			} else {
				selfP.stats[i] = Math.floor(selfP.unboostedStats[i] / boostTable[-selfP.boosts[i]]);
			}
		}

		selfB.runEvent('ModifyPokemon', selfP);
	};
	this.getMoveData = function(move) {
		move = selfB.getMove(move);
		for (var i=0; i<selfP.moveset.length; i++) {
			var moveData = selfP.moveset[i];
			if (moveData.id === move.id) {
				return moveData;
			}
		}
		return null;
	};
	this.deductPP = function(move, amount, source) {
		move = selfB.getMove(move);
		var ppData = selfP.getMoveData(move);
		var success = false;
		if (ppData) {
			ppData.used = true;
		}
		if (ppData && ppData.pp) {
			ppData.pp -= selfB.runEvent('DeductPP', selfP, source||selfP, move, amount||1);
			if (ppData.pp <= 0) {
				ppData.pp = 0;
			}
			success = true;
		}
		selfP.lastMove = move.id;
		if (!amount) {
			selfP.movedThisTurn = true;
		}
		return success;
	};
	this.gotAttacked = function(move, damage, source) {
		if (!damage) damage = 0;
		move = selfB.getMove(move);
		selfP.lastAttackedBy = {
			pokemon: source,
			damage: damage,
			move: move.id,
			thisTurn: true
		};
	};
	this.getMoves = function() {
		var moves = [];
		var hasValidMove = false;
		for (var i=0; i<selfP.moveset.length; i++) {
			var move = selfP.moveset[i];
			if (selfP.disabledMoves[move.id] || !move.pp) {
				move.disabled = true;
			}
			moves.push(move);
			if (!move.disabled) {
				hasValidMove = true;
			}
		}
		if (!hasValidMove) {
			moves = [{
				move: 'Struggle',
				id: 'struggle',
				pp: 1,
				maxpp: 1,
				disabled: false
			}];
		}
		if (selfP.volatiles['mustRecharge']) {
			moves = [{
				move: 'Recharge',
				id: 'Recharge',
				pp: 1,
				maxpp: 1,
				disabled: false
			}];
		}
		return moves;
	};
	this.positiveBoosts = function() {
		var boosts = 0;
		for (var i in selfP.boosts) {
			if (selfP.boosts[i] > 0) boosts += selfP.boosts[i];
		}
		return boosts;
	};
	this.boostBy = function(boost, source, effect) {
		var changed = false;
		for (var i in boost) {
			var delta = boost[i];
			selfP.baseBoosts[i] += delta;
			if (selfP.baseBoosts[i] > 6) {
				delta -= selfP.baseBoosts[i] - 6;
				selfP.baseBoosts[i] = 6;
			}
			if (selfP.baseBoosts[i] < -6) {
				delta -= selfP.baseBoosts[i] - (-6);
				selfP.baseBoosts[i] = -6;
			}
			if (delta) changed = true;
		}
		selfP.update();
		return changed;
	};
	this.clearBoosts = function() {
		for (var i in selfP.baseBoosts) {
			selfP.baseBoosts[i] = 0;
		}
		selfP.update();
	};
	this.setBoost = function(boost) {
		for (var i in boost) {
			selfP.baseBoosts[i] = boost[i];
		}
		selfP.update();
	};
	this.copyVolatileFrom = function(pokemon) {
		selfP.clearVolatile();
		selfP.baseBoosts = pokemon.baseBoosts;
		selfP.volatiles = pokemon.volatiles;
		selfP.update();
		pokemon.clearVolatile();
		for (var i in selfP.volatiles) {
			var status = selfP.getVolatile(i);
			if (status.noCopy) {
				delete selfP.volatiles[i];
			}
		}
	};
	this.transformInto = function(baseTemplate) {
		var pokemon = null;
		if (baseTemplate && baseTemplate.template) {
			pokemon = baseTemplate;
			baseTemplate = pokemon.template;
			if (pokemon.fainted || pokemon.illusion || pokemon.volatiles['substitute']) {
				return false;
			}
		} else if (!baseTemplate || !baseTemplate.abilities) {
			baseTemplate = selfB.getTemplate(baseTemplate);
		}
		if (!baseTemplate.abilities || pokemon && pokemon.transformed) {
			return false;
		}
		selfP.transformed = true;
		selfP.template = baseTemplate;
		selfP.baseStats = selfP.template.baseStats;
		selfP.types = baseTemplate.types;
		if (pokemon) {
			selfP.ability = pokemon.ability;
			selfP.set = pokemon.set;
			selfP.moveset = [];
			selfP.moves = [];
			for (var i=0; i<pokemon.moveset.length; i++) {
				var moveData = pokemon.moveset[i];
				var moveName = moveData.move;
				if (moveData.id === 'hiddenpower') {
					moveName = 'Hidden Power '+selfP.hpType;
				}
				selfP.moveset.push({
					move: moveName,
					id: moveData.id,
					pp: 5,
					maxpp: moveData.maxpp,
					disabled: false
				});
				selfP.moves.push(toId(moveName));
			}
			for (var j in pokemon.baseBoosts) {
				selfP.baseBoosts[j] = pokemon.baseBoosts[j];
			}
		}
		selfP.update();
		return true;
	};
	this.clearVolatile = function(init) {
		selfP.baseBoosts = {
			atk: 0,
			def: 0,
			spa: 0,
			spd: 0,
			spe: 0,
			accuracy: 0,
			evasion: 0
		};
		this.moveset = [];
		this.moves = [];
		// we're copying array contents
		// DO NOT "optimize" it to copy just the pointer
		// if you don't know what a pointer is, please don't
		// touch this code
		for (var i=0; i<this.baseMoveset.length; i++) {
			this.moveset.push(this.baseMoveset[i]);
			this.moves.push(toId(this.baseMoveset[i].move));
		}
		selfP.transformed = false;
		selfP.ability = selfP.baseAbility;
		selfP.template = selfP.baseTemplate;
		selfP.baseStats = selfP.template.baseStats;
		selfP.types = selfP.template.types;
		for (var i in selfP.volatiles) {
			if (selfP.volatiles[i].linkedStatus) {
				selfP.volatiles[i].linkedPokemon.removeVolatile(selfP.volatiles[i].linkedStatus);
			}
		}
		selfP.volatiles = {};
		selfP.switchFlag = false;
		selfP.lastMove = '';
		selfP.lastDamage = 0;
		selfP.lastAttackedBy = null;
		selfP.movedThisTurn = false;
		selfP.newlySwitched = true;
		selfP.beingCalledBack = false;
		selfP.illusion = null;
		selfP.update(init);
	};

	this.hasType = function (type) {
		if (!type) return false;
		if (Array.isArray(type)) {
			for (var i=0; i<type.length; i++) {
				if (selfP.hasType(type[i])) return true;
			}
		} else {
			if (selfP.types[0] === type) return true;
			if (selfP.types[1] === type) return true;
		}
		return false;
	};
	// returns the amount of damage actually dealt
	this.faint = function(source, effect) {
		if (selfP.fainted) return 0;
		var d = selfP.hp;
		selfP.hp = 0;
		selfP.switchFlag = false;
		selfP.status = 'fnt';
		//selfP.fainted = true;
		selfB.faintQueue.push({
			target: selfP,
			source: source,
			effect: effect
		});
		return d;
	};
	this.damage = function(d, source, effect) {
		if (!selfP.hp) return 0;
		if (d < 1 && d > 0) d = 1;
		d = Math.floor(d);
		if (isNaN(d)) return 0;
		if (d <= 0) return 0;
		selfP.hp -= d;
		if (selfP.hp <= 0) {
			d += selfP.hp;
			selfP.faint(source, effect);
		}
		return d;
	};
	this.hasMove = function(moveid) {
		if (moveid.id) moveid = moveid.id;
		moveid = toId(moveid);
		for (var i=0; i<selfP.moveset.length; i++) {
			if (moveid === selfB.getMove(selfP.moveset[i].move).id) {
				return moveid;
			}
		}
		return false;
	};
	this.canUseMove = function(moveid) {
		if (moveid.id) moveid = moveid.id;
		if (!selfP.hasMove(moveid)) return false;
		if (selfP.disabledMoves[moveid]) return false;
		var moveData = selfP.getMoveData(moveid);
		if (!moveData || !moveData.pp || moveData.disabled) return false;
		return true;
	};
	this.getValidMoves = function() {
		var pMoves = selfP.getMoves();
		var moves = [];
		for (var i=0; i<pMoves.length; i++) {
			if (!pMoves[i].disabled) {
				moves.push(pMoves[i].move);
			}
		}
		if (!moves.length) return ['Struggle'];
		return moves;
	};
	// returns the amount of damage actually healed
	this.heal = function(d) {
		if (!selfP.hp) return 0;
		d = Math.floor(d);
		if (isNaN(d)) return 0;
		if (d <= 0) return 0;
		if (selfP.hp >= selfP.maxhp) return 0;
		selfP.hp += d;
		if (selfP.hp > selfP.maxhp) {
			d -= selfP.hp - selfP.maxhp;
			selfP.hp = selfP.maxhp;
		}
		return d;
	};
	// sets HP, returns delta
	this.sethp = function(d) {
		if (!selfP.hp) return 0;
		d = Math.floor(d);
		if (isNaN(d)) return;
		if (d < 1) d = 1;
		d = d-selfP.hp;
		selfP.hp += d;
		if (selfP.hp > selfP.maxhp) {
			d -= selfP.hp - selfP.maxhp;
			selfP.hp = selfP.maxhp;
		}
		return d;
	};
	this.trySetStatus = function(status, source, sourceEffect) {
		if (!selfP.hp) return false;
		if (selfP.status) return false;
		return selfP.setStatus(status, source, sourceEffect);
	};
	this.cureStatus = function() {
		if (!selfP.hp) return false;
		// unlike clearStatus, gives cure message
		if (selfP.status) {
			selfB.add('-curestatus', selfP, selfP.status);
			selfP.setStatus('');
		}
	};
	this.setStatus = function(status, source, sourceEffect, ignoreImmunities) {
		if (!selfP.hp) return false;
		status = selfB.getEffect(status);
		if (selfB.event) {
			if (!source) source = selfB.event.source;
			if (!sourceEffect) sourceEffect = selfB.effect;
		}

		if (!ignoreImmunities && status.id) {
			// the game currently never ignores immunities
			if (!selfP.runImmunity(status.id==='tox'?'psn':status.id)) {
				selfB.debug('immune to status');
				return false;
			}
		}

		if (selfP.status === status.id) return false;
		var prevStatus = selfP.status;
		var prevStatusData = selfP.statusData;
		if (status.id && !selfB.runEvent('SetStatus', selfP, source, sourceEffect, status)) {
			selfB.debug('set status ['+status.id+'] interrupted');
			return false;
		}

		selfP.status = status.id;
		selfP.statusData = {id: status.id, target: selfP};
		if (source) selfP.statusData.source = source;

		if (status.id && !selfB.singleEvent('Start', status, selfP.statusData, selfP, source, sourceEffect)) {
			selfB.debug('status start ['+status.id+'] interrupted');
			// cancel the setstatus
			selfP.status = prevStatus;
			selfP.statusData = prevStatusData;
			return false;
		}
		selfP.update();
		if (status.id && !selfB.runEvent('AfterSetStatus', selfP, source, sourceEffect, status)) {
			return false;
		}
		return true;
	};
	this.clearStatus = function() {
		// unlike cureStatus, does not give cure message
		return selfP.setStatus('');
	};
	this.getStatus = function() {
		return selfB.getEffect(selfP.status);
	};
	this.eatItem = function(source, sourceEffect) {
		if (!selfP.hp || !selfP.isActive) return false;
		if (!selfP.item) return false;
		if (!sourceEffect && selfB.effect) sourceEffect = selfB.effect;
		if (!source && selfB.event && selfB.event.target) source = selfB.event.target;
		var item = selfP.getItem();
		if (selfB.runEvent('UseItem', selfP, null, null, item) && selfB.runEvent('EatItem', selfP, null, null, item)) {
			selfB.add('-enditem', selfP, item, '[eat]');

			selfB.singleEvent('Eat', item, selfP.itemData, selfP, source, sourceEffect);

			selfP.lastItem = selfP.item;
			selfP.item = '';
			selfP.itemData = {id: '', target: selfP};
			selfP.usedItemThisTurn = true;
			return true;
		}
		return false;
	};
	this.useItem = function(source, sourceEffect) {
		if (!selfP.hp || !selfP.isActive) return false;
		if (!selfP.item) return false;
		if (!sourceEffect && selfB.effect) sourceEffect = selfB.effect;
		if (!source && selfB.event && selfB.event.target) source = selfB.event.target;
		var item = selfP.getItem();
		if (selfB.runEvent('UseItem', selfP, null, null, item)) {
			switch (item.id) {
			default:
				if (!item.isGem) {
					selfB.add('-enditem', selfP, item);
				}
				break;
			}

			selfB.singleEvent('Use', item, selfP.itemData, selfP, source, sourceEffect);

			selfP.lastItem = selfP.item;
			selfP.item = '';
			selfP.itemData = {id: '', target: selfP};
			selfP.usedItemThisTurn = true;
			return true;
		}
		return false;
	};
	this.takeItem = function(source) {
		if (!selfP.hp || !selfP.isActive) return false;
		if (!selfP.item) return false;
		if (!source) source = selfP;
		var item = selfP.getItem();
		if (selfB.runEvent('TakeItem', selfP, source, null, item)) {
			selfP.lastItem = '';
			selfP.item = '';
			selfP.itemData = {id: '', target: selfP};
			return item;
		}
		return false;
	};
	this.setItem = function(item, source, effect) {
		if (!selfP.hp || !selfP.isActive) return false;
		item = selfB.getItem(item);
		selfP.lastItem = selfP.item;
		selfP.item = item.id;
		selfP.itemData = {id: item.id, target: selfP};
		if (item.id) {
			selfB.singleEvent('Start', item, selfP.itemData, selfP, source, effect);
		}
		if (selfP.lastItem) selfP.usedItemThisTurn = true;
		return true;
	};
	this.getItem = function() {
		return selfB.getItem(selfP.item);
	};
	this.clearItem = function() {
		return selfP.setItem('');
	};
	this.setAbility = function(ability, source, effect) {
		if (!selfP.hp) return false;
		ability = selfB.getAbility(ability);
		if (selfP.ability === ability.id) {
			return false;
		}
		if (ability.id === 'Multitype' || ability.id === 'Illusion' || selfP.ability === 'Multitype') {
			return false;
		}
		selfP.ability = ability.id;
		selfP.abilityData = {id: ability.id, target: selfP};
		if (ability.id) {
			selfB.singleEvent('Start', ability, selfP.abilityData, selfP, source, effect);
		}
		return true;
	};
	this.getAbility = function() {
		return selfB.getAbility(selfP.ability);
	};
	this.clearAbility = function() {
		return selfP.setAbility('');
	};
	this.getNature = function() {
		return selfB.getNature(selfP.set.nature);
	};
	this.addVolatile = function(status, source, sourceEffect) {
		if (!selfP.hp) return false;
		status = selfB.getEffect(status);
		if (selfB.event) {
			if (!source) source = selfB.event.source;
			if (!sourceEffect) sourceEffect = selfB.effect;
		}

		if (selfP.volatiles[status.id]) {
			selfB.singleEvent('Restart', status, selfP.volatiles[status.id], selfP, source, sourceEffect);
			return false;
		}
		if (!selfP.runImmunity(status.id)) return false;
		selfP.volatiles[status.id] = {id: status.id};
		selfP.volatiles[status.id].target = selfP;
		if (source) {
			selfP.volatiles[status.id].source = source;
			selfP.volatiles[status.id].sourcePosition = source.position;
		}
		if (sourceEffect) {
			selfP.volatiles[status.id].sourceEffect = sourceEffect;
		}
		if (status.duration) {
			selfP.volatiles[status.id].duration = status.duration;
		}
		if (status.durationCallback) {
			selfP.volatiles[status.id].duration = status.durationCallback.call(selfB, selfP, source, sourceEffect);
		}
		if (!selfB.singleEvent('Start', status, selfP.volatiles[status.id], selfP, source, sourceEffect)) {
			// cancel
			delete selfP.volatiles[status.id];
			return false;
		}
		selfP.update();
		return true;
	};
	this.getVolatile = function(status) {
		status = selfB.getEffect(status);
		if (!selfP.volatiles[status.id]) return null;
		return status;
	};
	this.removeVolatile = function(status) {
		if (!selfP.hp) return false;
		status = selfB.getEffect(status);
		if (!selfP.volatiles[status.id]) return false;
		selfB.singleEvent('End', status, selfP.volatiles[status.id], selfP);
		delete selfP.volatiles[status.id];
		selfP.update();
		return true;
	};
	this.hpPercent = function(d) {
		//return Math.floor(Math.floor(d*48/selfP.maxhp + 0.5)*100/48);
		return Math.floor(d*100/selfP.maxhp + 0.5);
	};
	this.getHealth = function(realHp) {
		if (selfP.fainted) return ' (0 fnt)';
		//var hpp = Math.floor(48*selfP.hp/selfP.maxhp) || 1;
		var hpstring;
		if (realHp) {
			hpstring = ''+selfP.hp+'/'+selfP.maxhp;
		} else {
			var hpp = Math.floor(selfP.hp*100/selfP.maxhp + 0.5) || 1;
			if (!selfP.hp) hpp = 0;
			hpstring = ''+hpp+'/100';
		}
		var status = '';
		if (selfP.status) status = ' '+selfP.status;
		return ' ('+hpstring+status+')';
	};
	this.hpChange = function(d) {
		return ''+selfP.hpPercent(d)+selfP.getHealth();
	};
	this.lockMove = function(moveid) {
		// shortcut function for locking a pokemon into a move
		// not really necessary, btw: you can do this all in effect script
		// actually, you can do nearly everything in effect script
		if (!moveid || (!selfP.hasMove(moveid) && moveid !== 'recharge')) return;
		if (moveid === 'recharge') selfP.disabledMoves['recharge'] = false;
		var moves = selfP.moveset;
		for (var i=0; i<moves.length; i++) {
			if (moves[i].id !== moveid) {
				moves[i].disabled = true;
			}
		}
		selfP.trapped = true;
	};
	this.runImmunity = function(type, message) {
		if (selfP.fainted) {
			return false;
		}
		if (!type || type === '???') {
			return true;
		}
		if (selfP.negateImmunity[type]) return true;
		if (!selfB.getImmunity(type, selfP)) {
			selfB.debug('natural immunity');
			if (message) {
				selfB.add('-immune', selfP);
			}
			return false;
		}
		var immunity = selfB.runEvent('Immunity', selfP, null, null, type);
		if (!immunity) {
			selfB.debug('artificial immunity');
			if (message && immunity !== null) {
				selfB.add('-immune', selfP);
			}
			return false;
		}
		return true;
	};
	this.runBeforeMove = function(target, move) {
		if (selfP.fainted) return true;
		return !selfB.runEvent('BeforeMove', selfP, target, move);
	};
	this.destroy = function() {
		// deallocate ourself

		// get rid of some possibly-circular references
		side = null;
		selfB = null;
		selfS = null;
		selfP.side = null;

		selfP = null;
	};

	selfP.clearVolatile(true);
}