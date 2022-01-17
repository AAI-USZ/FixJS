function( mw, $ ) { "use strict";

    

	// Bind to new player event

	$( mw ).bind( 'newEmbedPlayerEvent', function( event, embedPlayer ){

        

		embedPlayer.bindHelper( 'KalturaSupport_CheckUiConf', function( event, $uiConf, callback ){

			

			// Check if plugin exists

			if( embedPlayer.isPluginEnabled( 'download' ) ) {

                window[ 'downloadPlugin' ].init( embedPlayer );

			}



			// Continue player build-out

			callback();

		});

        

	});



    window[ 'downloadPlugin' ] = {

        

        init: function( embedPlayer ) {

            this.embedPlayer = embedPlayer;

            this.addPlayerBindings();

            this.addDownloadButton();

        },



		addPlayerBindings: function() {

			var _this = this;

            var embedPlayer = this.embedPlayer;

			embedPlayer.unbindHelper( 'downloadMedia' );

            embedPlayer.bindHelper( 'downloadMedia', function() {

                _this.downloadMedia();

            });

		},

        

        addDownloadButton: function() {

			var embedPlayer = this.embedPlayer;

            // TODO: We should have better support for kClick attribute [ sendNotification( 'doDownload' ) ]

            // var downloadButtonClick = embedPlayer.getKalturaConfig( 'downloadBtnControllerScreen', 'kClick' );

			

            mw.log( 'downloadPlugin :: add download button' );

            embedPlayer.bindHelper( 'addControlBarComponent', function(event, controlBar ){



                var $downloadButton = {

                    'w': 28,

                    'o': function( ctrlObj ) {

                        var $textButton = $( '<div />' )

                            .attr( 'title', embedPlayer.getKalturaConfig( 'downloadBtnControllerScreen', 'tooltip' ) )

                            .addClass( "ui-state-default ui-corner-all ui-icon-arrowthickstop-1-s ui-icon_link rButton" )

                            .append( $( '<span />' ).addClass( "ui-icon ui-icon-arrowthickstop-1-s" ) )

                            // TODO: Add label/text buttons support

                            // .append( $( '<span />' ).text( _this.config.label ).css( {'font-family': embedPlayer.getKalturaConfig( 'downloadBtnControllerScreen', 'font' ),'font-size': '12px'} ) )

                            .buttonHover()

                            .click(function() {

                                embedPlayer.triggerHelper( 'downloadMedia' );

                            });

                        return $textButton;

                    }

                };



                // Add the button to control bar

                controlBar.supportedComponents[ 'downloadButton' ] = true;

                controlBar.components[ 'downloadButton' ] = $downloadButton;

            });

            

        },

        

		downloadMedia: function() {



			var embedPlayer = this.embedPlayer;

			var cdnUrl = mw.getConfig('Kaltura.CdnUrl');

			if ( cdnUrl.indexOf('cdnbakmi.kaltura.com') != -1 ) {

				cdnUrl += '/html5/html5lib/v' + KALTURA_LOADER_VERSION + '/modules/KalturaSupport'

			}

			var downloadUrl = cdnUrl + '/download.php/wid/' + embedPlayer.kwidgetid + '/uiconf_id/' + embedPlayer.kuiconfid + '/entry_id/' + embedPlayer.kentryid + '?forceDownload=true';

            window.open( downloadUrl );

            

		}

                      

    };

}