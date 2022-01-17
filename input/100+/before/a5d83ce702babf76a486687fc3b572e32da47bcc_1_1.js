function()
		{
			var _this = this;
			console.log('pull up color wheel!')
			this.$el.find('.close').show();
			
			if( this.wheelLoaded != true )
			{
				$.farbtastic(this.$el.find('.control-colorpicker'))
					.setColor( _this.settings.color )
					.linkTo(function(color){
						_this.refreshColor( color, (( _this.opacitySlider)? _this.opacitySlider.getValue() : 1 ) );
						_this.settings.color = color;
					});
				this.wheelLoaded = true;
			}
			else
			{
				this.$el.find('.control-colorpicker').show();
				
			}
		}