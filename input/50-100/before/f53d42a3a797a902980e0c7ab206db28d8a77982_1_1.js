function()
		{
			var _this = this;
			this.render();
			if(this.attr.link)
			{
				
				$(this.el).click(function(){
					window.location = 'http://'+ _this.attr.link
				})
				.addClass('linked-layer');

			}
			
			this.model.trigger('ready',this.model.id)
		}