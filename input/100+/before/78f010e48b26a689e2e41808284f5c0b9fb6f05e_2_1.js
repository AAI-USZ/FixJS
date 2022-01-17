function()
		{
			
			var scaleSlider = new Layer.Views.Lib.Slider({
				property : 'width',
				model: this.model,
				label : 'Scale',
				suffix : '%',
				min : 1,
				max : 200,
			});
			
			var opacitySlider = new Layer.Views.Lib.Slider({
				property : 'opacity',
				model: this.model,
				label : 'Opacity',
				step : 0.01,
				min : .05,
				max : 1,
			});
			
			this.controls.append( scaleSlider.getControl() )
				.append( opacitySlider.getControl() );
			
			return this;
		
		}