function()
		{
			console.log('	LAYER LIST EXIT')
			this.undelegateEvents();
			this.$el.find('#controls').empty();
			//this.remove();
			this.onLayerExit();
		}