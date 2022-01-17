function(frame){
			var frameLayers = frame.get('layers');
			var readyLayers = __this.layers.ready;
			var errorLayers = __this.layers.error

			if(_.include( frameLayers, layerID) ) frame.loader.incrementLoaded( layerID, __this.layers.get(layerID).status );
			if( _.difference(frameLayers, readyLayers, errorLayers ).length == 0 )
			{
				console.log('frame is ready to play!!! '+frame.id)
				frame.trigger('ready', frame.id);
			}
		}