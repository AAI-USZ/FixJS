function(ret, user_name)
	{   
	    if (user_name == null)
	       user_name = this._current_user_name;
		var val = (this._user_data[user_name] == null)?
		           0:this._user_data[user_name].DEX;
		ret.set_float(val);     		
	}