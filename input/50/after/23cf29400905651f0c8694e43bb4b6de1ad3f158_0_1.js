function()
			{
				if(this.model.status != 'error') this.$el.find('.citation-icon i').addClass('loaded');
				this.$el.find('.player-citation-bubble').show();
			}