function(e, ui)
				{
					_this.updateSliderInput(ui.value);
					_this.updateVisualElement( ui.value );
					
					if( !_.isNull( _this.settings.slide ) ) _this.settings.slide();
					 _this.settings.onSlide();
				}