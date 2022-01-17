function( attributes )
		{
			this.checkAttr();
			console.log(''+this.get('attr').persistLayers)
			console.log('is the attr an object?', this.get('attr') ,_.isArray(this.get('attr')), this);
			
			this.on('updateFrameOrder',this.updateFrameOrder,this);
			this.on('sync', this.checkAttr, this);
			this.attachTabView();
			
			this.trigger('ready');
		}