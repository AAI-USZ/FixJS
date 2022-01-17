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
			
			var opacitySlider = new Layer.Views.Lib.Slider({
				property : 'opacity',
				model: this.model,
				label : 'Opacity',
				step : 0.01,
				min : .05,
				max : 1,
			});
			
			var leftSlider = new Layer.Views.Lib.Slider({
				property : 'left',
				model: this.model,
				label : 'Left',
				suffix : '%',
				step : 1,
				min : 0,
				max : 100,
			});
			
			var topSlider = new Layer.Views.Lib.Slider({
				property : 'top',
				model: this.model,
				label : 'Top',
				step : 1,
				suffix : '%',
				min : 0,
				max : 100,
			});
			
			this.controls
				.append( dissolveCheck.getControl() )
				.append( widthSlider.render().el )
				.append( heightSlider.render().el )
				.append( topSlider.render().el )
				.append( leftSlider.render().el )
				.append( opacitySlider.render().el );
			
			return this;
		
		}