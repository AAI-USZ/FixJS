function(layerID){
			var layer = _this.layers.get( layerID );
			if( layer.status != 'loading' && layer.status != 'ready' )
			{
				_this.preloadLayer( layer )
			}
		}