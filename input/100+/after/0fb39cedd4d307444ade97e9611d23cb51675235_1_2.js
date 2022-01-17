function(forceUpdate)
	{
		var pos = this.GetSpritePosAtTile(this._tileX, this._tileY);
		if (forceUpdate ||
			Crafty.DrawManager.onScreen({ _x : this.x, _y : this.y, _w : this.w, _h : this.h }) ||
			Crafty.DrawManager.onScreen({ _x : pos.x, _y : pos.y, _w : this.w, _h : this.h }))
		{
			// TODO: should update _x, _y, _z, then trigger events
			this.x = pos.x;
			this.y = pos.y;
			this.z = pos.z;
			this.trigger("VisualUpdated");
			return true;
		}
		return false;
	}