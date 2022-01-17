function( callback ){
		var _this = this;
		var embedPlayer = _this.getEmbedPlayer();
		// Empty the target and setup player and playerList divs
		$( _this.target )
		.addClass( 'ui-widget-content' )
		.css('position', 'relative' );
		
		// @@TODO Add media-playlist-ui container

		// Add the video list: 
		$( _this.target ).append(
			$('<div />')
			.attr( 'id',  'video-list-wrapper-' + _this.id )
			.addClass('video-list-wrapper')
			.css({
				'position' : 'absolute',
				'z-index' : '1',
				'overflow-x' : 'hidden',
				'overflow-y' : 'auto',
				'bottom': '0px'
			})
			.append( 
				$( '<div />')
				.addClass( 'media-rss-video-list' )
				.attr( 'id',  'media-rss-video-list-' + _this.id )
			)
			.hide()
		);
		// Check if we have multiple playlist and setup the list and bindings
		if( _this.sourceHandler.hasMultiplePlaylists() ){
			var playlistSet = _this.sourceHandler.getPlaylistSet();
			if( _this.layout == 'vertical' ){
				// TODO
			} else {
				var playlistWidth = embedPlayer.getKalturaConfig('playlistHolder', 'width') + 'px';
				$('#playlistContainer').width( playlistWidth );
				$('#playerContainer').css( 'margin-right', playlistWidth);
			}
			var $plListContainer =$('<div />')
			.addClass( 'playlist-set-container' )
			.css({
				'height' : '20px',
				'padding' : '4px'
			})
			.append(
				$('<span />')
				.addClass( 'playlist-set-list' )
				.css( {
					'white-space':'pre'
				})
			);
			$( _this.target ).append( $plListContainer );
			
			var $plListSet = $( _this.target ).find( '.playlist-set-list' );

			$.each( playlistSet, function( inx, playlist){
				// check for playlist name: 
				if( !playlist.name ){
					return true;
				}
				// Add a divider
				if( inx != 0 ){
					$plListSet.append( $('<span />').text( ' | ') );
				}
				var $plLink = $('<a />')
					.attr('href', '#')
					.text( playlist.name )
					.click( function(){
						_this.switchTab( inx );
						return false;
					})
					.buttonHover();
				// highlight the default
				if( inx == 0 ){
					$plLink.addClass( 'ui-state-active' );
				}
				$plListSet.append( $plLink );	
			});
			
			// Check playlistSet width and add scroll left / scroll right buttons
			if( $plListSet.width() > $plListContainer.width() ){
				var baseButtonWidth = 24;
				$plListSet.css( {
					'position': 'absolute',
					'left' : baseButtonWidth + 'px'
				});
				var $scrollButton =	$('<div />')
				.addClass( 'ui-corner-all ui-state-default' )
				.css({
					'position' : 'absolute',
					'top' : '-1px',
					'cursor' : 'pointer',
					'margin' :'0px',
					'padding' : '2px',
					'width'	: '16px',
					'height' : '16px'
				});

				var $buttonSpan = $('<span />')
					.addClass( 'ui-icon' )
					.css('margin', '2px' );

				var plScrollPos = 0;
				var scrollToListPos = function( pos ){

					var listSetLeft = $plListSet.find('a').eq( pos ).offset().left - $plListSet.offset().left ;

					mw.log("scroll to: " + pos + ' left: ' + listSetLeft);
					$plListSet.animate({'left': -( listSetLeft - baseButtonWidth) + 'px'} );
				};
				
				$plListContainer
				.append(
					$scrollButton.clone()
					.css('left', '0px')
					.append( $buttonSpan.clone().addClass('ui-icon-circle-arrow-w') )
					.click( function(){
						//slide right
						if( plScrollPos >= 0){
							mw.log("scroll right");
							plScrollPos--;
							scrollToListPos( plScrollPos );
						}
					})
					.buttonHover(),

					$scrollButton.clone()
					.css('right', '0px')
					.append( $buttonSpan.clone().addClass('ui-icon-circle-arrow-e') )
					.click( function(){
						//slide left
						if( plScrollPos < $plListSet.find('a').length-1 ){
							plScrollPos++;
							scrollToListPos( plScrollPos );
						}
					})
					.buttonHover()
				);
			}
		};

		// Add the selectable media list
		_this.addMediaList();

		var $videoListWraper = $( '#video-list-wrapper-' + _this.id );
		
		// Update the player
		_this.drawEmbedPlayer( _this.clipIndex, function(){
			var playerSize = _this.getTargetPlayerSize();
			// Update the list height ( vertical layout )
			if( _this.layout == 'vertical' ){
				var verticalSpace = $( _this.target + ' .media-rss-video-player-container' ).height();
				$videoListWraper.css( {
					'top' : parseInt( verticalSpace ) + 4,
					'left' : '0px',
					'right' : '4px'
						
				} );
				// Add space for the multi-playlist selector:
				if( _this.sourceHandler.hasMultiplePlaylists() ){
					$videoListWraper.css({
						'top' : parseInt( verticalSpace ) + 26
					});
				}
			} else {
				// Update horizontal layout
				$videoListWraper.css( {
					'top' : '0px',
					'left' :  parseInt( playerSize.width ) + 4,
					'right' : '2px',
					'margin-top' : '5px'
				} );
				// Add space for the multi-playlist selector:
				if( _this.sourceHandler.hasMultiplePlaylists() ){
					$( _this.target + ' .playlist-set-container').css( {
						'left' : parseInt( playerSize.width ) + 4
					});
					$videoListWraper.css( {
						'top' : '26px'
					});
				}
			}
			// Show the videoList
			$videoListWraper.show();
			
			_this.sourceHandler.adjustTextWidthAfterDisplay( $videoListWraper );
			
			// Should test for touch support
			if( mw.isMobileDevice() && !$('#video-list-wrapper-' + _this.id )[0].iScroll ){
				// give real height for iScroll:
				$videoListWraper.css("height", $videoListWraper.height() );
				// add iScroll:
				$('#video-list-wrapper-' + _this.id )[0].iScroll = 
					new iScroll( 'video-list-wrapper-' + _this.id, { 
						'onTouchEnd': function(e, moved){ 
							if( moved !== false){
								_this.onTouchScroll = true;
							} else {
								_this.onTouchScroll = false
							}
							return false 
						}, 
						'hScroll' : false, 
						'hideScrollbar' : false 
					});
			}				
			if( callback ) {
				callback();
			}
		});
	}