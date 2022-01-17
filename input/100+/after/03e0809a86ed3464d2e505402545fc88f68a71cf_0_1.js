function(e,ui)
				{
					_this.updateVisualElement( ui.value );
					_this.updateSliderInput(ui.value);
					_this.saveValue(ui.value)
					_this.settings.onChange();
				}