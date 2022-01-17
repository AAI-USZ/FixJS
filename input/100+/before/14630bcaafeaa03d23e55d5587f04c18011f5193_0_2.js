function()
		{
			var url = this.base();
			if( !_.isUndefined(this.search.query) ) url += '&q=' + this.search.query;
			if( !_.isUndefined(this.search.contentType) ) url += '&content=' + this.search.contentType;
			if( !_.isUndefined(this.search.collectionID) && this.search.collectionID != 'all' )
			{
			    url += '&collection=' + this.search.collectionID;
			    // hammering - collection filtering should not be done by user_id nor site_id
			    url = url.replace("&user=-1","");
			    url = url.replace("&site="+sessionStorage.getItem('siteid'),"");
			}
			return url;
		}