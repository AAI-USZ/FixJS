function(name, modulator, type) {
			var type = type || "+";
			var m = { type:type, operands:[this[name], modulator], name:name, NO_MEMO:true };
			this[name] = m;
			modulator.modding.push({ ugen:this, mod:m });
			this.mods.push(m);
			Gibberish.dirty(this);
			return modulator;
		}