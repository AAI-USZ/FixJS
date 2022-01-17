function (styles, outputNode) {
		var index,
			outputList = [],
			masterStyleSuffix = "",
			style,
			citation,
			bibliography,
			citationCloseness = "",
			bibliographyCloseness = "",
			citationDiff,
			citationDistance,
			bibliographyDiff,
			bibliographyDistance,
			featuredStyleClass,
			featuredStyleText;

		for (index = 0; index < Math.min(styles.length, 20); index++)
		{
			style = styles[index];
			if (style.masterId != style.styleId)
			{
				masterStyleSuffix = ' (same as <a href="' + style.masterId + '">' +
							exampleCitations.styleTitleFromId[style.masterId] + '</a>)';
			} else {
				masterStyleSuffix = '';
			}

			citation = exampleCitations.exampleCitationsFromMasterId[style.masterId].
				formattedCitations[0];
			bibliography = exampleCitations.exampleCitationsFromMasterId[style.masterId].
				formattedBibliography;
			
			if (typeof style.userCitation !== "undefined" &&
				style.userCitation !== "" &&
				citation !== "") {
				citationDiff = CSLEDIT.diff.prettyHtmlDiff(style.userCitation, citation);
				citationCloseness = closenessString(citationDistance, style.userCitation, citation);
			}

			if (typeof style.userBibliography !== "undefined" &&
				style.userBibliography !== "" &&
				bibliography !== "") {
				bibliographyDiff =
					CSLEDIT.diff.prettyHtmlDiff(style.userBibliography, bibliography);
				bibliographyCloseness = closenessString(
						bibliographyDistance, style.userBibliography, bibliography);
			}

			featuredStyleClass = '';
			featuredStyleText = '';
			if (CSLEDIT.exampleData.topStyles.indexOf(style.styleId) !== -1) {
				featuredStyleClass = ' class="featuredStyle" ';
				featuredStyleText = '<span class=featuredStyle>Popular Style<span>';
			}

			outputList.push(
				'<table' + featuredStyleClass + '>' +
				'<tr><td colspan=3><a href="' + style.styleId + '">' +
				exampleCitations.styleTitleFromId[style.styleId] + "</a>"
				+ masterStyleSuffix + featuredStyleText + '</td></tr>' +
				'<tr><td nowrap="nowrap"><span class="faint">Inline citation</span></td>' +
				'<td class=match>' +
				citation + '</td>' + citationCloseness + '</tr>' +
				'<tr><td nowrap="nowrap"><span class="faint">Bibliography</span></td>' +
				'<td class=match>' +
				bibliography + '</td>' + bibliographyCloseness + "</tr>" +
				'<tr><td></td><td><button class="editStyle" styleURL="' +
				style.styleId + '">Edit style</a></td></tr>' +
				'</table>');
		}
		
		outputNode.html(
			'<p>Displaying ' + outputList.length + ' results:</p>' +
				outputList.join("<p><p>")
		);

		$("button.editStyle").click( function (event) {
			var styleURL = $(event.target).attr("styleURL");
			CSLEDIT.options.get("editStyle_func")(styleURL);
		});
	}