function(value)
		{
			if( this.settings.css )
				this.model.visual.$el.css( this.settings.property, value + this.settings.suffix );
		}