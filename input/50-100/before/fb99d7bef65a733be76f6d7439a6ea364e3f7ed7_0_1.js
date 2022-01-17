function(slot, data)
	{
		var ability = this._abilities[slot];
		if (!ability)
			throw ("ability in slot '", slot, "' not found!");

		ability.UsedBy(this, data);
	}