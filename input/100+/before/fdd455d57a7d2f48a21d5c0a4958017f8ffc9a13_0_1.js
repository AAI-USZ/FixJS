function(df)
	{
		//figure where the fragment should be added
		//mouse position
		var xy = this.globalToLocal(stage.mouseX, stage.mouseY);
		var p = xy2ra(xy.x,xy.y);
		df.setRotation(p.a);
		var min_v = _2PI; var min_i = 0;
		for(var i = 0; i < this.children.length; i = i + 1)
		{
			var v = Math.abs(bound_rads(p.a - this.children[i].getStart()));
			if(v < min_v)
			{
				min_v = v;
				min_i = i;
			}
		}
		//add the fragment
		
		df._drag = true;
		this.addFragAt(df, min_i);

        console.log('df.setAngle(_2PI*'+df.getLength()+'/'+this._eff_length+');');
		df.setAngle(_2PI*df.getLength()/this._eff_length);
		//begin the dragging!
		df.onDragStart($.Event('mousemove'));
	}