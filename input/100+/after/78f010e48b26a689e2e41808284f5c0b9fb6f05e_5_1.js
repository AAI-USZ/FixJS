function()
		{
			var dissolveCheck = new Layer.Views.Lib.Checkbox({
				property : 'dissolve',
				model: this.model,
				label : 'Fade In'
			});
			
			var color = new Layer.Views.Lib.ColorPicker({
				property : 'color',
				color : this.model.get('attr').color,
				model: this.model,
				label : 'Text Color',
				opacity : true
			});
			
			var textStyles = new Layer.Views.Lib.TextStyles({
				model : this.model
			})
			
			var fontChooser = new Layer.Views.Lib.FontChooser({
				model : this.model
			})
			
			this.controls
				.append( dissolveCheck.getControl() )
				.append( textStyles.getControl() )
				.append( fontChooser.getControl() )
				.append( color.getControl() );
			
			return this;
		}