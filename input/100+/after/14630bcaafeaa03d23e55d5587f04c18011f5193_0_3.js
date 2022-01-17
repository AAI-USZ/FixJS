function(search,reset)
		{
			var _this = this;
			$(this.el).fadeTo(1000,0.5);
			$(this.el).spin('small');
			
			this.setSearch(search,reset);
			this.fetch({
				success : function(collection,response)
				{
					_this.target.fadeTo(1000,1).spin(false).empty();
					_this.renderCollection();
				}
			})
		}