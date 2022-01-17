function(search, reset)
		{
			if(reset) this.search = search;
			else _.extend(this.search,search)
		}