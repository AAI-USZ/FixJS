function init() {
		var timeout, name, countryCode;
		var countriesListTemplate = templates.getTemplate('country-list-template');
		$("#country-list").html(countriesListTemplate({countries: countries}));
		$("#country-list .country-search").click(function() {
			countryCode = $(this).data('campaign');
			var params = {
				limit: 200
			};
			$("#results").empty();
			var d = monuments.getForCountry( countryCode, params ).done( function( monuments ) {
				showMonumentsList(monuments);
			});
			showPage( 'results-page', d );
		});

		var monumentSearchTimeout = null;
		var monumentSearchReq = null;
		$( '#filter-monuments' ).keyup( function() {
			var value = this.value;
			if( monumentSearchTimeout ) {
				window.clearTimeout( timeout );
				console.log( 'clearing timeout' );
			}

			if( monumentSearchReq ) {
				monumentSearchReq.abort();
				monumentSearchReq = null;
				console.log( 'clearing req' );
			}

			monumentSearchTimeout = window.setTimeout( function() {
				$("#results").empty();
				monumentSearchReq = monuments.filterByNameForCountry( countryCode, value ).done( function( monuments ) {
					showMonumentsList( monuments );
				} ).always( function() {
					monumentSearchReq = null;
				});
				showPage( 'results-page', monumentSearchReq );
				monumentSearchTimeout = null;
			}, 500 );
		});

		$(".page-link").click(function() {
			var toPage = $(this).data('page');
			if($(this).data('login') === 'required') {
				if(api.loggedIn) {
					showPage(toPage);
				} else {
					doLogin(function() {
						showPage(toPage);
					}, function(err) {
					});
				}
			} else {
				showPage(toPage);
			}
			return false;
		});
		
		$( 'button.back, a.back' ).click( function() {
			goBack();
		} );

		$('#countries').click(function() {
			showPage('country-page');
		});

		$( '.show-search' ).click( function() {
			var page = $( this ).parents( '.page' ).attr( 'id' );
			showSearchBar( page );
		});

		var campaignSearchTimeout = null;
		$( "#filter-campaign" ).keyup( function() {
			if( campaignSearchTimeout ) {
				window.clearTimeout( campaignSearchTimeout );
			}
			campaignSearchTimeout = window.setTimeout( function() {
				var val = $( "#filter-campaign" ).val().toLowerCase();
				$( ".country-search" ).each( function() {
					var country = $(this).text().toLowerCase();
					if( country.indexOf( val ) !== -1 ) {
						$(this).parent().show();
					} else {
						$(this).parent().hide();
					}
				});
			}, 400);
		});

		$('#nearby').click(function() {
			showPage( 'locationlookup-page' );
			navigator.geolocation.getCurrentPosition(function(pos) {
				$("#results").empty();
				userLocation = pos;
				currentSortMethod = 'distance';
				$( 'html' ).addClass( 'locationAvailable' );
				var d = monuments.getInBoundingBox(pos.coords.longitude - nearbyDeg,
					pos.coords.latitude - nearbyDeg,
					pos.coords.longitude + nearbyDeg,
					pos.coords.latitude + nearbyDeg
				).done(function(monuments) {
					showMonumentsList(monuments);
					showMonumentsMap(monuments, {
						lat: pos.coords.latitude,
						lon: pos.coords.longitude
					}, 10);
				});
				showPage( 'results-page', d );
			}, function(err) {
				displayError( mw.msg( 'geolocating-failed-heading') , mw.msg( 'geolocating-failed-text' ) );
			},{
				timeout: 20000 // give up looking up location.. maybe they are in airplane mode
			});
		});

		// upload-page
		$('#takephoto').click(function() {
			navigator.camera.getPicture(function(data) {
				// success
				state.fileUri = data;
				showPhotoConfirmation(data);
			}, function(msg) {
				console.log( "TakePhoto cancelled because of " + msg );
				// Do nothing.
			}, {
				// options
				destinationType: Camera.DestinationType.FILE_URI
			});
		});
		$('#selectphoto').click(function() {
			navigator.camera.getPicture(function(data) {
				// success
				state.fileUri = data;
				showPhotoConfirmation(data);
			}, function(msg) {
				console.log( "SelectPhoto cancelled because of " + msg );
				// Do nothing.
			}, {
				// options
				destinationType: Camera.DestinationType.FILE_URI,
				sourceType: Camera.PictureSourceType.PHOTOLIBRARY
			});
		});

		$(document).localize().dprize();
		showPage('welcome-page');

		// allow cancellation of current api upload request
		$( '#upload-progress-page .back' ).click( function() {
			console.log( 'request to cancel upload' );
			api.cancel();
		});
		
		// Everything has been initialized, so let's show them the UI!
		$( 'body' ).removeClass( 'hidden' );
	}