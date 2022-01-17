function()
		{
			var _this = this;
			
			var uiValue = ( !_.isUndefined(this.model.get('attr')[this.settings.property]) ) ? this.model.get('attr')[this.settings.property] : this.settings.value;
			this.$el.append( _.template( this.getTemplate(), _.extend(this.settings,{uiValue:uiValue}) ));

			//slider stuff here
			this.$el.find('.control-slider').slider({
				range : 'min',
				min : this.settings.min,
				max : this.settings.max,
				value : uiValue,
				step : this.settings.step,
				start : function(e,ui)
				{
					_this.settings.onStart();
				},
				slide : function(e, ui)
				{
					_this.updateSliderInput(ui.value);
					_this.updateVisualElement( ui.value );
					
					if( !_.isNull( _this.settings.slide ) ) _this.settings.slide();
					 _this.settings.onSlide();
				},
				change : function(e,ui)
				{
					_this.updateVisualElement( ui.value );
					_this.updateSliderInput(ui.value);
					_this.saveValue(ui.value)
					_this.settings.onChange();
				},
				stop : function(e,ui)
				{
					_this.settings.onStop();
				}
				
			});
			
			this.$el.find('.slider-num-input').html(uiValue).css({'left': _this.$el.find('a.ui-slider-handle').css('left') });
			
			return this;
		}