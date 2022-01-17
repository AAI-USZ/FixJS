function(_f, _cf) 
	{
		this.Container_initialize();
		//set initial values
		
		this._props = {
			'rotation': 0.0,
			'angle':0.0,
			'radius':0.0,
			'alpha':1.0,
			'clockwise':1.0,	
		};
		
		this._f = _f;
		this._cf = _cf;
		this._area = Area.CW;
		if(_cf != undefined)
		{
			if(_cf.strand == 1)
				this._area = Area.CW;
			if(_cf.strand == -1)
				this._area = Area.CCW;
		}

		this._fl = new FragmentLabel(
            this._f.getName(), 
            F.radii[this._area] + F.ldelta[this._area], 
            this._props.angle / 2.0);

		this._fs = new FragmentShape(0,0,F.radii[this._area]);
		this._props.radius = F.radii[this._area];
		
		this._drag = false;
		
		if(this._area == Area.CCW)
		{
			this.setClockwise(-1);
		}
				
		this.addChild(this._fs);
		this.addChild(this._fl);
		
	}