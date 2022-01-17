function()
		{
			return zeega.app.url_prefix + "api/search?r_items=1&r_itemswithcollections=0&user=-1&site="+sessionStorage.getItem('siteid')+"&page="+ this.page
		}