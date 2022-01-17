function LoadSourceResultsCallback(exampleRows)
		{
			PrepareNewSourceSearchResults();
			// TODO: factor in the search keywords here
			// but for now just show all
			// TODO: Add sort as well
			var profiles = findOutlinesAndUnreferencedSources(exampleRows);
			for (var i=0; i < profiles.length; ++i) {
				var doc = profiles[i];
				var authorDetails = "";
				var sourceDetails = "";
				var rowId = "";
				if (doc.head.contentType == "chiasm" || doc.head.contentType == "outline")
				{
					var authorProfile = fetchAuthorProfileByOutline(doc);
					authorDetails = formatName(authorProfile, "");
					sourceDetails = formatSource(doc, "");
					rowId = doc._id;
				}
				if (doc.head.contentType == "sourceProfile")
				{
					// this is unreferenced source, so it doesn't have any associated outline details
					var sourceFormFields = CreateEmptySourceFormData();
					var combinedSource = fillCommonSourceData(sourceFormFields, doc);				
					rowId = combinedSource.source._id; 
					sourceDetails = formatCombinedSource(combinedSource, "");
				}
				// TODO: add source rows not referenced in document, findOutlinesAndUnreferencedSources
				
				// TODO: use "resp.rows" for sourceRows
				//var sourceDoc = getCommonSourceProfile(doc, sourceRows);
				
				// skip blank source
				if (sourceDetails.length == 0)
					continue;
				var dataTable1 = $("#sourceSearchResults").data("dataTable");
				var profile = fetchSourceProfile(doc._id + "_source");
				var iSettings = dataTable1.fnAddData(
					[	EmptyIfNull(profile.source.details), 
						EmptyIfNull(profile.outline.source.details), 
						authorDetails ],
						false /* don't redraw */
				);
				var drow = dataTable1.fnSettings().aoData[iSettings[0]];
				$(drow.nTr)
					.attr("id", rowId + "_source")
					.addClass("creditRow")
					.click(function(event) {
						// first turn off any other selected Row.
						var parentRow = $(event.target).parent("tr");
						selectCreditRow(parentRow, fetchSourceProfile, "[name='updateSourceDetails']");
		  				return false;
					});
				
				// Add some special markup
				var cells = $(drow.nTr).children("td");				
				$((cells)[0]).addClass("sourceDetails");
				$((cells)[1]).addClass("sourceDetails");
				dataTable1.fnDraw();
			};
		}