function( data, options )
	{
		
		this.render();
		
		this.generateBackbone();
		
		this.parseData( data );
		
		var s = ( _.isUndefined(options) || _.isUndefined(options.sequenceID) ) ? data.project.sequences[0].id : options.sequenceID;
		var f = ( _.isUndefined(options) || _.isUndefined(options.frameID) ) ? _.find(data.project.sequences, function(seq){return seq.id == s }).frames[0].id : options.frameID;
		
		this.setCurrentSequence( s );
		this.setCurrentFrame( f );
		this.setCurrentLayers();
		
		//this.currentFrame.on('ready', this.renderCurrentFrame, this);
		console.log('current sequence/frame/layers')
		console.log(this.currentSequence)
		console.log(this.currentFrame)
		console.log(this.currentLayers)
		
		//this.goToFrame( this.currentFrame );
		if( _.isUndefined(zeega.app.router) )
		{
			this.zeega = false;
			this.startRouter();
		}
		else this.router = zeega.app.router;
	}