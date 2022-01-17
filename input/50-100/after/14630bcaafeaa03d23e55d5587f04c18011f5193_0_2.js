function()
		{
			var _this = this;
			this.target.fadeTo(1000,0.5).spin('small');
			this.fetch({
				success : function(collection,response)
				{
					_this.target.fadeTo(1000,1).spin(false).empty();
					_this.renderCollection();
				}
			})
		}