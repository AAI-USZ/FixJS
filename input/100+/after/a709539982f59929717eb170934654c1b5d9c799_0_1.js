function( layerID )
	{
		if(!this.busy)
		{
			var nextFrame = this.getRightFrame();
			if( nextFrame != false && nextFrame != this.currentFrame )
			{
				var layers = [];
				if(nextFrame.get('layers'))
				{
					var l = _.compact(nextFrame.get('layers'));
					l.push( parseInt(layerID) );
					layers = l;
				}
				else layers = [ parseInt(layerID) ];
				nextFrame.save({ layers : layers });
			}
		}
	}