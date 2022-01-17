function( clipIndex, callback){
		var _this = this;
		var $target = _this.playlist.getVideoPlayerTarget();
		mw.log( "PlaylistHandlerKaltura::drawEmbedPlayer:" + clipIndex );
		// Check for the embedPlayer at the target
		if( ! $('#' + _this.playlist.getVideoPlayerId() ).length ){
			mw.log("Warning: Playlist Handler works best with video pre-loaded in the DOM");
			$target.append(
				_this.getKalturaVideoTag( clipIndex )
			);
			// trigger embedding:
			$target.find('video').embedPlayer( callback );
			return ;
		}
		// Get the embed 
		var embedPlayer = _this.playlist.getEmbedPlayer();

		// Hide our player if not needed
		var $playerHolder = embedPlayer.getKalturaConfig('PlayerHolder', ["visible", "includeInLayout"]);
		if( ( $playerHolder.visible === false  || $playerHolder.includeInLayout === false ) && !embedPlayer.useNativePlayerControls() ) {
			embedPlayer.displayPlayer = false;
		}

		// update the selected index: 
		embedPlayer.kalturaPlaylistData.selectedIndex = clipIndex;

		// check if player already ready: 
		if( embedPlayer.playerReady ){
			callback();
		} else {
			// Set up ready binding (for ready )
			$( embedPlayer ).bind('playerReady' + this.bindPostFix, function(){
				callback();
			});
		}
		
	}