function( frame )
	{
		var _this = this;
		
		if(this.currentFrame == frame) $('#zeega-player').prepend( frame.loader.render().el );
		
		var linkedFrameLayers = [];
		_.each(frame.links, function(frameID){
			linkedFrameLayers = _.union( _this.frames.get(frameID).get('layers'), linkedFrameLayers );
		})
		console.log('preload layers: '+ _.union(linkedFrameLayers,frame.get('layers')) );
		_.each( _.union(linkedFrameLayers,frame.get('layers')), function(layerID){
			var layer = _this.layers.get( layerID );
			if( layer.status != 'loading' && frame.status != 'ready' )
			{
				_this.preloadLayer( layer )
			}
		});
		frame.trigger('loading', frame.id);
	}