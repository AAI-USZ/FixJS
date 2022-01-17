function(slot, data)
	{
		if (this._currentAbility != null)
			return;

		var ability = this._abilities[slot];
		if (!ability)
			throw ("ability in slot '", slot, "' not found!");

		ability.UsedBy(this, data);
		if (ability.IsActive)
			this._currentAbility = ability;
	}