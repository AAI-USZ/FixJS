function() {
				var d = util.deferred();
				var c = model.get_rdf(this.get('url'));
				c.fetch().then(function() {
					console.log('caling resolve ');
					d.resolve(c);
				});
				return d.promise(); 
			}