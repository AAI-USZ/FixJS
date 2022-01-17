function showMonumentsList(monuments) {
		$("#results").empty();
		var monumentTemplate = templates.getTemplate('monument-list-item-template');	
		var listThumbFetcher = commonsApi.getImageFetcher(64, 64);
		if( monuments.length === 0 ) {
			$( templates.getTemplate( 'monument-list-empty-template' )() ).
				localize().appendTo( '#results' );
		}
		$.each(monuments, function(i, monument) {
			var $monumentItem = $(monumentTemplate({monument: monument}));
			monument.requestThumbnail(listThumbFetcher).done(function(imageinfo) {
				$monumentItem.find('img.monument-thumbnail').attr('src', imageinfo.thumburl);
			});
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
		showPage('results-page');
		$("#monuments-list").show();
		geo.hideMap();
	}