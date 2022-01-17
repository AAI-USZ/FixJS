function()
		{
			var color = new Layer.Views.Lib.ColorPicker({
				property : 'color',
				color : this.model.get('attr').color,
				model: this.model,
				label : 'Text Color',
				opacity : true
			});
			
			/*
			var sizeSlider = new Layer.Views.Lib.Slider({
				property : 'fontSize',
				model: this.model,
				label : 'Font Size',
				suffix : '%',
				min : 100,
				max : 1000,
				
			});
			*/
			
			var textStyles = new Layer.Views.Lib.TextStyles({
				model : this.model
			})
			
			var fontChooser = new Layer.Views.Lib.FontChooser({
				model : this.model
			})
			
			this.controls
				.append( textStyles.getControl() )
				.append( fontChooser.getControl() )
				.append( color.getControl() );
			
			return this;
		}