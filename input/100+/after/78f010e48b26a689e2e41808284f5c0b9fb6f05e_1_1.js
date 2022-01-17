function()
		{
			var dissolveCheck = new Layer.Views.Lib.Checkbox({
				property : 'dissolve',
				model: this.model,
				label : 'Fade In'
			});
			
			var widthSlider = new Layer.Views.Lib.Slider({
				property : 'width',
				model: this.model,
				label : 'Width',
				suffix : '%',
				min : 1,
				max : 200,
			});
			var heightSlider = new Layer.Views.Lib.Slider({
				property : 'height',
				model: this.model,
				label : 'Height',
				suffix : '%',
				min : 1,
				max : 200,
			});
			
			var leftSlider = new Layer.Views.Lib.Slider({
				property : 'left',
				model: this.model,
				label : 'Horizontal Position',
				suffix : '%',
				min : 0,
				max : 100,
			});
			var topSlider = new Layer.Views.Lib.Slider({
				property : 'top',
				model: this.model,
				label : 'Vertical Position',
				suffix : '%',
				min : 0,
				max : 100,
			});
			
			var opacitySlider = new Layer.Views.Lib.Slider({
				property : 'opacity',
				model: this.model,
				label : 'Opacity',
				step : 0.01,
				min : .05,
				max : 1,
			});
			
			var gMaps = new Layer.Views.Lib.GoogleMaps({
				model: this.model,
			});
			
			$(this.controls)
				.append( dissolveCheck.getControl() )
				.append( gMaps.getControl() )
				.append( widthSlider.getControl() )
				.append( heightSlider.getControl() )
				.append( leftSlider.getControl() )
				.append( topSlider.getControl() )
				.append( opacitySlider.getControl() );
			
			return this;
		
		}