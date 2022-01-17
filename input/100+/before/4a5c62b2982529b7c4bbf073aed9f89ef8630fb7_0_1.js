function()
		{
			var url = null;
			if ( this.isNew() )
			{
				url = sessionStorage.getItem('hostname')+sessionStorage.getItem('directory') + "api/items";
			}
			else if (this.isUpdate)
			{
			    this.isUpdate = false;
			    url = sessionStorage.getItem('hostname')+sessionStorage.getItem('directory') + "api/items/"+this.id;
			}
			else
			{
				url = sessionStorage.getItem('hostname')+sessionStorage.getItem('directory') + "api/items/"+this.id;
			}
			//console.log("Final URL is " + url);
			return url; 
		}