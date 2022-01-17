function()
		{
			
			var playbackControls = new Layer.Views.Lib.Playback({
				model : this.model
			});
			
			var dissolveCheck = new Layer.Views.Lib.Checkbox({
				property : 'dissolve',
				model: this.model,
				label : 'Fade In'
			});
			
			var volumeSlider = new Layer.Views.Lib.Slider({
				property : 'volume',
				model: this.model,
				label : 'Volume',
				min : 0,
				max : 1,
				step : 0.01,
				css : false
			});
			
			
			var fadeInSlider = new Layer.Views.Lib.Slider({
				property : 'fade_in',
				model: this.model,
				label : 'Fade In (sec)',
				min : 0,
				max :5,
				step : 0.1,
				css : false
			});
			
			
			var fadeOutSlider = new Layer.Views.Lib.Slider({
				property : 'fade_out',
				model: this.model,
				label : 'Fade Out (sec)',
				min : 0,
				max : 5,
				step : 0.1,
				css : false
			});
			
			
			
			var widthSlider = new Layer.Views.Lib.Slider({
				property : 'width',
				model: this.model,
				label : 'Width',
				suffix : '%',
				min : 1,
				max : 200,
				
				onStart : function()
				{
					this.model.visual.$el.addClass('editing-layer');
				},
				onStop : function()
				{
					this.model.visual.$el.removeClass('editing-layer')
				}
			});
			
			var heightSlider = new Layer.Views.Lib.Slider({
				property : 'height',
				model: this.model,
				label : 'Height',
				suffix : '%',
				min : 1,
				max : 200,
				onStart : function()
				{
					this.model.visual.$el.addClass('editing-layer');
				},
				onStop : function()
				{
					this.model.visual.$el.removeClass('editing-layer')
				}
			});
			
			var opacitySlider = new Layer.Views.Lib.Slider({
				property : 'opacity',
				model: this.model,
				label : 'Opacity',
				step : 0.01,
				min : 0,
				max : 1,
			});
			
			var audioLabel = new Layer.Views.Lib.SectionLabel({label:'Audio'})
			
			this.controls
				.append( playbackControls.getControl() )
				.append( dissolveCheck.getControl() )
				.append( widthSlider.getControl() )
				.append( heightSlider.getControl() )
				.append( opacitySlider.getControl() )
				.append( audioLabel.getControl() )
				.append( volumeSlider.getControl() )
				.append( fadeInSlider.getControl() )
				.append( fadeOutSlider.getControl() );
				
			
			return this;
		
		}