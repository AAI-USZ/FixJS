function () {

			var tags = this.collection;

			tags.on('add', this.addOne, this);
			tags.on('reset', this.addAll, this);
			tags.on('all', this.render, this);
			
			tags.fetch({
				success: function(){
					tags.pager();
				},
				silent:true
			});


		}