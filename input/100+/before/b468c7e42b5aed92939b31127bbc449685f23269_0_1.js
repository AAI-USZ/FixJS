function()
		{
			var _this = this;
			
			if(this.settings.opacity )
			{
				var opacitySlider = new Layer.Views.Lib.Slider({
					css : false,
					property : this.settings.property +'Opacity',
					value : this.settings[this.settings.property+'Opacity'] || 1,
					model: this.model,
					label : 'Opacity',
					step : 0.01,
					min : .05,
					max : 1,
					slide : function()
					{
						_this.refreshColor(_this.settings.color, opacitySlider.getValue() )
					}
				});
			}
			
			this.$el.append( _.template( this.getTemplate(), this.settings ));
			
			if( this.settings.opacity ) this.$el.append( opacitySlider.getControl() );
			
			$.farbtastic(this.$el.find('.control-colorpicker'))
				.setColor( _this.settings.color )
				.linkTo(function(color){
					_this.refreshColor( color, (( opacitySlider)? opacitySlider.getValue() : 1 ) );
					_this.settings.color = color;
				});
				
			
			
			return this;
		}