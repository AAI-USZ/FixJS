function(name, modulator, type) {
			var type = type || "+";
			var m = { type:type, operands:[this[name], modulator], name:name };
			this[name] = m;
			modulator.modding.push({ ugen:this, mod:m });
			this.mods.push(m);
			Gibberish.generate(this);
			Gibberish.dirty(this);
			return modulator;
		}