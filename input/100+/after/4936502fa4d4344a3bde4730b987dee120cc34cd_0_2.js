function( layerID )
	{
		if(!this.busy)
		{
			var layerModel = this.project.layers.get(layerID)
			//get persistent layers
			var attr = this.currentSequence.get('attr');
			
			// check to see if the layer is already persistent
			if( _.include(attr.persistLayers, layerID ) )
			{
				//remove persistence
				console.log('remove persistence')
				attr.persistLayers = _.without( attr.persistLayers, layerID );
				if(attr.persistLayers.length == 0 ) attr.persistLayers = [false];
				this.removePersistenceFromFrames( layerID );
			}
			else
			{
				console.log('add persistence')
				//add persistence
				attr.persistLayers.unshift( layerID );
				this.addPersistenceToFrames( layerID );
			}
			
			this.currentSequence.save({ 'attr': attr });
		} // busy
		
	}