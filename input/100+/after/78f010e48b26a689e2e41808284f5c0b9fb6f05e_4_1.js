function()
		{
			var dissolveCheck = new Layer.Views.Lib.Checkbox({
				property : 'dissolve',
				model: this.model,
				label : 'Fade In'
			});
			
			var color = new Layer.Views.Lib.ColorPicker({
				property : 'backgroundColor',
				color : this.attr.backgroundColor,
				model: this.model,
				label : 'Color'
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
				min : 0,
				max : 1,
			});
			
			this.controls
				.append( dissolveCheck.getControl() )
				.append( color.getControl() )
				.append( opacitySlider.getControl() )
				.append( widthSlider.getControl() )
				.append( heightSlider.getControl() );
			
			return this;
		
		}