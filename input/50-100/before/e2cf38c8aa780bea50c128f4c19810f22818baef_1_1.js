function( attributes )
		{
			this.checkAttr();
			this.set({ 'attr' : _.defaults(this.get('attr'),this.defaultAttr) })
			
			this.on('updateFrameOrder',this.updateFrameOrder,this);
			this.on('sync', this.checkAttr, this);
			this.attachTabView();
			
			this.trigger('ready');
		}