function()
		{
			var style = {
				'backgroundColor' : this.attr.backgroundColor,
				'height' : this.model.get('attr').height +'%'
			}

			$(this.el).css( style );
			
			this.model.trigger('ready',this.model.id)
			
			return this;
		}