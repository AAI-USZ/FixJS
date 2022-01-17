function(ev)
	{
		var p = this._get_mev(ev);
		if(this._drag)
		{
			this.setRotation(p.a - this._mouse_offset);
			
			var area = F.getArea(p.r);
			if(area != this._area)
			{
				if(area != undefined)
				{
					//console.log('Area '+a2s(this._area)+' -> '+a2s(area));
					this.setArea(area);
				}
				else
				{
                    console.log('Suppressing leave for debug');
                    /*
					stage.onMouseMove = null;
					stage.onMouseUp = null;
					ev.onMouseMove = null;
					
					set_cursor();
					this.parent.designer().leave(this);
					return;
                    */
				}
			}
			
			
			stage.update();
			this.parent.sortOne(this);
		}
		else
		{
			var x = (p.x - this._mouse_down.x);
			var y = (p.y - this._mouse_down.y);
			if((x*x + y*y) > (0.5 * F.width * F.width))
				this.onDragStart(ev);
		}
		
	}