function () {

			var feedings = this.collection;

			feedings.on('add', this.addOne, this);
			feedings.on('reset', this.addAll, this);
			feedings.on('all', this.render, this);
			
			feedings.fetch({
				success: function(){
					feedings.pager();
				},
				silent:true
			});


		}