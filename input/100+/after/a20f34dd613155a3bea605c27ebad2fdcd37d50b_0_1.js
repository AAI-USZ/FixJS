function showMonumentsList(monuments) {
		var monumentTemplate = templates.getTemplate('monument-list-item-template');	
		var listThumbFetcher = commonsApi.getImageFetcher(64, 64);
		if( monuments.length === 0 ) {
			$( templates.getTemplate( 'monument-list-empty-template' )() ).
				localize().appendTo( '#results' );
		} else {
			$( '#monuments-sort' ).html(
				templates.getTemplate( 'monument-list-heading' )()
			).localize();
			$( '#monuments-sort button' ).click( function() {
				$( '#results' ).empty();
				currentSortMethod = $( this ).data( 'sortby' );
				window.setTimeout( function() { // use timeout for smoother experience
					showMonumentsList( monuments );
				}, 0 );
			});
		}

		// update distances
		if( userLocation ) {
			// TODO: only do this if location has changed recently
			$.each( monuments, function() {
				this.distance = calculateDistance( 
					userLocation.coords,
					{ latitude: this.lat, longitude: this.lon }
				).toFixed( 1 ); // distance fixed to 1 decimal place
			} );
		}

		function sortAlgorithm( m1, m2 ) {
			return m1[ currentSortMethod ] < m2[ currentSortMethod ] ? -1 : 1;
		}

		$.each( monuments.sort( sortAlgorithm ), function( i, monument ) {
			var distance, msg;
			var $monumentItem = $(monumentTemplate({monument: monument}));
			monument.requestThumbnail(listThumbFetcher).done(function(imageinfo) {
				$monumentItem.find('img.monument-thumbnail').attr('src', imageinfo.thumburl);
			});
			
			if( monument.distance ) {
				$( '<div class="distance" />' ).
					text( mw.msg( 'monument-distance-km', this.distance ) ).appendTo( $( 'a', $monumentItem ) );
			}
			$monumentItem.appendTo('#results').click(function() {
				showMonumentDetail(monument);
			});
		});
		listThumbFetcher.send();

		var mapPopulated = false;
		$("#toggle-result-view").unbind("change").change(function() {
			var mapVisible = $("#toggle-result-view").val() !== "map-view";
			if(mapVisible) {
				$("#monuments-list").show();
				geo.hideMap();
			} else {
				if(!mapPopulated) {
					showMonumentsMap(monuments);
					mapPopulated = true;
				} 
				geo.showMap();
				$("#monuments-list").hide();
			}
		});
		$("#monuments-list").show();
		geo.hideMap();
	}