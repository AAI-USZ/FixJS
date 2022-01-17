function( slotType, doneCallback ){
		var _this = this;
		// Setup a sequence timeline set: 
		var sequenceProxy = _this.getSequenceProxy( slotType );
		
		// Generate a sorted key list:
		var keyList = [];
		$.each( sequenceProxy, function(k, na){
			keyList.push( k );
		});
		
		mw.log( "AdTimeline:: displaySlots: " + slotType + ' found sequenceProxy length: ' + keyList.length );
		
		// if don't have any ads issue the callback directly:
		if( !keyList.length ){
			doneCallback();
			return ;
		}
		
		// Sort the sequence proxy key list: 
		keyList.sort();
		var seqInx = 0;
		// Run each sequence key in order:
		var runSequeceProxyInx = function( seqInx ){
			// Update the "sequenceProxy" var
			_this.embedPlayer.sequenceProxy.isInSequence = true;
			var key = keyList[ seqInx ] ;
			if( !sequenceProxy[key] ){
				doneCallback();
				return ;
			}
			// Run the sequence proxy function: 
			sequenceProxy[ key ]( function(){
				
				// Done with slot increment display slot count
				_this.displayedSlotCount++;
				
				// done with the current proxy call next
				seqInx++;
				// Trigger the EndAdPlayback between each ad in the sequence proxy 
				// ( if we have more ads to go )
				if( sequenceProxy[ keyList[ seqInx ] ] ){
					_this.embedPlayer.triggerHelper( 'AdSupport_EndAdPlayback', _this.currentAdSlotType );
				}
				// call with a timeout to avoid function stack
				setTimeout(function(){
					runSequeceProxyInx( seqInx );
				}, 0 );
			});
		};
		runSequeceProxyInx( seqInx );
	}