function()
		{
			var _this = this;
			
			if(this.settings.opacity )
			{
				this.opacitySlider = new Layer.Views.Lib.Slider({
					css : false,
					property : this.settings.property +'Opacity',
					value : this.settings[this.settings.property+'Opacity'] || this.settings.opacityValue,
					model: this.model,
					label : this.settings.label+' Opacity',
					step : 0.01,
					min : .05,
					max : 1,
					slide : function()
					{
						_this.refreshColor(_this.settings.color, _this.opacitySlider.getValue() )
					}
				});
			}
			
			this.$el.append( _.template( this.getTemplate(), _.extend(this.settings,{'color':this.model.get('attr')[this.settings.property]}) ));
			
			if( this.settings.opacity ) this.$el.append( this.opacitySlider.getControl() );
			
			this.initHexField();
			
			return this;
		}