function(response) {
				var data = Ext.JSON.decode(response.responseText);
				data = data.data[0];
				
				if(data.component)
					this.component_name = data.component
				
				callback.call(this,data);
			}