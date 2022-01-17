function(ret, user_name)
	{   
	    if (user_name == null)
	       user_name = this._current_user_name;
		ret.set_int(this._user_data[user_name].VIT);           
	}