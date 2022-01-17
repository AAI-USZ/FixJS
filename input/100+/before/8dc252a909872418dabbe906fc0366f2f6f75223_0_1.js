function(i, monument) {
			var $monumentItem = $(monumentTemplate({monument: monument}));
			monument.requestThumbnail(listThumbFetcher).done(function(imageinfo) {
				$monumentItem.find('img.monument-thumbnail').attr('src', imageinfo.thumburl);
			});
			$monumentItem.appendTo('#results').click(function() {
				showMonumentDetail(monument);
			});
		}