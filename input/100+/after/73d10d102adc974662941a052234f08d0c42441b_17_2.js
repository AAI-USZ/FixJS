function () {
		var bestMatchQuality = 999,
			bestMatchIndex = -1,
			userCitation = cleanInput($("#userCitation").cleditor()[0].doc.body.innerHTML),
			userCitationText = $("#userCitation").cleditor()[0].doc.body.innerText,
			userBibliography = cleanInput($("#userBibliography").cleditor()[0].doc.body.innerHTML),
			userBibliographyText = $("#userBibliography").cleditor()[0].doc.body.innerText,
			result = [],
			matchQualities = [],
			citationMatchQuality,
			bibliographyMatchQuality,
			index = 0,
			styleId,
			exampleCitation,
			formattedCitation,
			thisMatchQuality,
			row = function (title, value) {
				return "<tr><td><span class=faint>" + title + "</span></td><td>" + value + "</td></tr>";
			};

		console.time("searchForStyle");

		if (clEditorIsEmpty("#userCitation")) {
			userCitation = "";
		}
		if (clEditorIsEmpty("#userBibliography")) {
			userBibliography = "";
		}

		for (styleId in exampleCitations.exampleCitationsFromMasterId) {
			if (exampleCitations.exampleCitationsFromMasterId.hasOwnProperty(styleId)) {
				exampleCitation = exampleCitations.exampleCitationsFromMasterId[styleId][exampleIndex];

				if (exampleCitation !== null && exampleCitation.statusMessage === "") {
					formattedCitation = exampleCitation.formattedCitations[0];

					if (userCitation !== "") {
						citationMatchQuality = CSLEDIT.diff.matchQuality(
							userCitation, formattedCitation);
					} else {
						citationMatchQuality = 0;
					}
					if (userBibliography !== "") {
						bibliographyMatchQuality = CSLEDIT.diff.matchQuality(
							userBibliography, exampleCitation.formattedBibliography);
					} else {
						bibliographyMatchQuality = 0;
					}

					thisMatchQuality = 0;
					if (citationMatchQuality > tolerance) {
					   thisMatchQuality += citationMatchQuality;
					}
			 		if (bibliographyMatchQuality > tolerance) {
						thisMatchQuality += bibliographyMatchQuality;
					}

					// give tiny boost to top popular styles
					if (CSLEDIT.exampleData.topStyles.indexOf(styleId) !== -1) {
						thisMatchQuality += 0.1;
					}

					if (thisMatchQuality > tolerance)
					{
						console.log("match quality: " + thisMatchQuality);
						matchQualities[index++] = {
							matchQuality : thisMatchQuality,
							styleId : styleId
						};
					}

					if (thisMatchQuality > bestMatchQuality) {
						bestMatchQuality = thisMatchQuality;
					}
				}
			}
		}
		matchQualities.sort(function (a, b) {return b.matchQuality - a.matchQuality});

		// top results
		for (index=0; index < Math.min(5, matchQualities.length); index++) {
			result.push({
					styleId : matchQualities[index].styleId,
					masterId : matchQualities[index].styleId,
					userCitation : userCitation,
					userBibliography : userBibliography,
					matchQuality : Math.min(1, matchQualities[index].matchQuality)
			});
		}
		
		CSLEDIT.searchResults.displaySearchResults(result, $("#searchResults"), exampleIndex);
		console.timeEnd("searchForStyle");
	}