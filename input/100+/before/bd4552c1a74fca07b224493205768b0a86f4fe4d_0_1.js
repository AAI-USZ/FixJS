function( embedPlayer, callback ){

		var _this = this;

		this.embedPlayer = embedPlayer;

		

		this.playheadFrequency = this.getConfig( 'playheadFrequency' ) || 5;

		

		// List of events we need to track

		var eventList = this.getConfig( 'listenTo' );

		this.eventsList = eventList.split(",");

		

		mw.log( 'DolStatistics:: eventList:' + this.eventsList );

		

		// Export the media type on plugin init so any dispatched  events can reference mediaTypeName 

		this.embedPlayer.setKalturaConfig( this.pluginName, 'mediaTypeName', this.getMediaTypeName() );



		//Setup player counter, ( used global, because on change media we re-initialize the plugin and reset all vars

		if( typeof this.getConfig('playbackCounter') == 'undefined' ) {

			if( embedPlayer['data-playerError'] ){

				this.setConfig( 'playbackCounter', 0 );

			} else {

				this.setConfig( 'playbackCounter', 1 );

			}

		}

		mw.log('DolStatistics:: Init plugin :: Plugin config: ', this.getConfig() );



		// Add player binding

		this.addPlayerBindings( callback );

	}