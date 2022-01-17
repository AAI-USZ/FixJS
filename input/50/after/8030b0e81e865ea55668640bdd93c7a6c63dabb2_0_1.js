function(data) {
				if (typeof(data) === 'string')
					wikis = JSON.parse(data);
				else
					wikis = data; 
				d.resolve(wikis);
			}