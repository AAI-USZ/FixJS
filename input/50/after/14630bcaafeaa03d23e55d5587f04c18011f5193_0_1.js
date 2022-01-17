function(search, reset)
		{
			if(reset) this.searchObject = search;
			else _.extend(this.searchObject,search);
		}