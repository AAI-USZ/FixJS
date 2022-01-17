function(response) {
				var data = Ext.JSON.decode(response.responseText);
				data = data.data[0];
				callback.call(this,data);
			}