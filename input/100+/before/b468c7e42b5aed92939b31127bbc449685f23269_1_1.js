function()
		{
			var bgcolor = new Layer.Views.Lib.ColorPicker({
				property : 'backgroundColor',
				color : this.model.get('attr').backgroundColor,
				model: this.model,
				label : 'Background Color',
				opacity : true
			});
			
			var color = new Layer.Views.Lib.ColorPicker({
				property : 'color',
				color : this.model.get('attr').color,
				model: this.model,
				label : 'Text Color',
				opacity : true
			});
			
			var sizeSlider = new Layer.Views.Lib.Slider({
				property : 'fontSize',
				model: this.model,
				label : 'Font Size',
				suffix : '%',
				min : 100,
				max : 1000,
				
			});
			
			var paddingSlider = new Layer.Views.Lib.Slider({
				property : 'padding',
				model: this.model,
				label : 'Padding',
				suffix : '%',
				min : 1,
				max : 50,
				
			});
			
			var clearButton = new Layer.Views.Lib.ClearStyles({ model : this.model });
			
			this.controls
				.append( bgcolor.getControl() )
				.append( color.getControl() )
				.append( sizeSlider.getControl() )
				.append( paddingSlider.getControl() )
				.append( clearButton.getControl() );
			
			return this;
		}