function (ret)
	{
        var x = (this._cmd_move_to.is_moving)? this.target.x:0;
		ret.set_float(x);
	}