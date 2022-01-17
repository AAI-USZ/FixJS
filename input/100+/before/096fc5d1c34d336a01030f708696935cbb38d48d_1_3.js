function()
	{
		var _old = this._length;
		
		//find the new real length, and store all the lengths
		this._length = 0;
		var lengths = new Array();
		for(var i = 0; i < this.getNumChildren(); i = i + 1)
		{
			var l = this.getChildAt(i).getLength();
			this._length = this._length + l;
			lengths.push(l);
		}
		
		//find the minimum length
		this._lmin = Math.ceil(this._length * F.minAngle / (_2PI));
		
		//find the effective length
		this._eff_length = 0;
		for(var i in lengths)
		{
			if(lengths[i] > this._lmin)
				this._eff_length = this._eff_length + lengths[i];
			else
				this._eff_length = this._eff_length + this._lmin;
		}
		return this;
	}