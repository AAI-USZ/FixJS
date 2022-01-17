function() {
				var d = util.deferred();
				console.log('source fetching ', this.get('url'), this);
				var c = model.get_rdf(this.get('url'));
				c.fetch().then(function() {
					console.log('calling resolve ');
					d.resolve(c);
				});
				return d.promise(); 
			}