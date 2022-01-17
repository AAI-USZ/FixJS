function(){
					// Trigger ad complete for prerolls if an ad was played: 
					if( _this.displayedSlotCount > 0 ){
						_this.embedPlayer.triggerHelper( 'AdSupport_EndAdPlayback', 'preroll' );
					}
					// Show bumpers:
					_this.displaySlots( 'bumper', function(){
						// restore the original source:
						embedPlayer.switchPlaySource( _this.originalSource, function(){
							// turn off preSequence
							embedPlayer.sequenceProxy.isInSequence = false;
							
							// trigger the preSequenceComplete event ( always fired ) 
							embedPlayer.triggerHelper( 'AdSupport_PreSequenceComplete' );
							
							// Avoid function stack
							setTimeout( function(){
								if( playedAnAdFlag  ){
									// reset displaySlotCount: 
									 _this.displayedSlotCount=0;
									// Restore the player if we played an ad: 
									_this.restorePlayer();
								}
								// Continue playback
								embedPlayer.play();
							},0);
						});
						
					});
				}