function( slotType ){
		if( ! slotType ){
			slotType = this.currentAdSlotType;
		}
		mw.log( "AdTimeline:: restorePlayer " );
		var embedPlayer = this.embedPlayer;
		embedPlayer.restoreEventPropagation();
		embedPlayer.enablePlayControls();
		embedPlayer.monitor();
		embedPlayer.seeking = false;
		// make sure the duration is set ( sometimes ad plugins don't clean up ) 
		if( embedPlayer.getNativeDuration() ){
			embedPlayer.duration = embedPlayer.getNativeDuration();
		}
		
		// restore in sequence property; 
		embedPlayer.sequenceProxy.isInSequence = false;
		// trigger an event so plugins can restore their content based actions
		mw.log( 'AdTimeline:: trigger: AdSupport_EndAdPlayback')
		embedPlayer.triggerHelper( 'AdSupport_EndAdPlayback', this.currentAdSlotType);
		
		// Trigger slot event ( always after AdEnd )
		mw.log( 'AdTimeline:: trigger: AdSupport_' + slotType.replace('roll', '') + 'SequenceComplete')
		embedPlayer.triggerHelper( 'AdSupport_' + slotType.replace('roll', '') + 'SequenceComplete' );
	}