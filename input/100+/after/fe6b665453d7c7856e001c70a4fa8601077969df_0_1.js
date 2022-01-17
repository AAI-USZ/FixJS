function(data) {
		if ( data )
		{
			if ( this.nodes.length > 1 )
			{
				var htmlArray = new Array();
				for ( i in data ) 
				{
					var obj = data[i] ;
					obj.timestamp = rdr_tstodate(obj.timestamp) ;
					htmlArray.push( this.myTemplate.apply(obj) ) ;
				}
				this.HTML = htmlArray.join('');	
			}	
			else
			{	
				if (this.nodes.length > 1 )
					for ( i in data )
						data[i].timestamp = rdr_tstodate(data[i].timestamp) ;
				//If data exist we apply the template on the node
				data.timestamp = rdr_tstodate(data.timestamp) ;
				this.HTML = this.myTemplate.apply(data);

			}
		}
		else
		{
			//otherwise we put the text contained in the field
			this.HTML = this.text ;
		}
		this.setHtml( this.HTML ) ;
	}