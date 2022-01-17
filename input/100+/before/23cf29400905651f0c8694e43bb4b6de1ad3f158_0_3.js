function( layerID )
			{
				var _this = this;
				this.loadedCount++;
				this.$el.find('.layer-load-icon-'+ layerID +' i').addClass('loaded');
				
				$(this.el).find('.bar')
					.stop()
					.animate({width : this.loadedCount/this.model.get('layers').length * 100 +'%' },2000)
					.animate({width : this.loadedCount*1.5/this.model.get('layers').length * 100 +'%' },100000);
				
				if(this.model.get('layers').length == this.loadedCount)
				{
					if( _this.has_played ) this.fadeOut();
				}
			}