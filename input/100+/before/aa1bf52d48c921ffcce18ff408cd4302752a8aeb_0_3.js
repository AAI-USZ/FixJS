function( z )
		{
			this.moveOnStage();
			if(z) this.updateZIndex( z )
			if(this.model.status != 'error' ) this.onPlay();
			this.model.inFocus = true;
			
			//make the linked layers blink on entrance
			if(this.attr.link || this.model.get('type') == 'Link')
			{
				var _this = this;
				setTimeout( function(){ $(_this.el).addClass('link-blink') }, 250 );
				setTimeout( function(){ $(_this.el).removeClass('link-blink') }, 2000 );
			}
		}