function( layerID )
	{
		if(!this.busy)
		{
			var nextFrame = this.getRightFrame();
			if( nextFrame != false && nextFrame != this.currentFrame )
			{
				if(nextFrame.get('layers')) nextFrame.get('layers').push( parseInt(layerID) );
				else nextFrame.set('layers',[ parseInt(layerID) ],{silent:true});
				nextFrame.save();
			}
		}
	}