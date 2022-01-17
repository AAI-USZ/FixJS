function (ret)
	{
        var y = (this._cmd_move_to.is_moving)? this.target.y:0;
		ret.set_float(y);
	}