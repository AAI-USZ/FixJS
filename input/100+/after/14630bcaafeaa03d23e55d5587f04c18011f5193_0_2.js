function()
		{
			var url = this.base();
			if( !_.isUndefined(this.searchObject.query) ) url += '&q=' + this.searchObject.query;
			if( !_.isUndefined(this.searchObject.contentType) ) url += '&content=' + this.searchObject.contentType;
			if( !_.isUndefined(this.searchObject.collectionID) && this.searchObject.collectionID != 'all' )
			{
			    url += '&collection=' + this.searchObject.collectionID;
			    // hammering - collection filtering should not be done by user_id nor site_id
			    url = url.replace("&user=-1","");
			    url = url.replace("&site="+sessionStorage.getItem('siteid'),"");
			}
			return url;
		}