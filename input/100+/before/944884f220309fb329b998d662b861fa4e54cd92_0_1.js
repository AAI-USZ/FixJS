function (
			statusOut, exampleOut, citationsOut, bibliographyOut, callback) {

		console.time("runCiteprocAndDisplayOutput");

		var style = CSLEDIT.data.getCslCode(),
			inLineCitations = "",
			citations = [],
			formattedResult,
			citationTagStart = "<p>",
			citationTagEnd = "</p>",
			bibliographyTagStart = "<p>",
			bibliographyTagEnd = "</p>",
			startTime,
			citationDiffs,
			bibliographyDiffs,
			diffFormattedCitation,
			diffFormattedBibliography,
			cslData = CSLEDIT.data.get(),
			citationNodeCslId = CSLEDIT.data.getNodesFromPath("style/citation/layout", cslData)[0].cslId,
			bibliographyNodeCslId = CSLEDIT.data.getNodesFromPath("style/bibliography/layout", cslData)[0].cslId;

		statusOut.html("<i>Re-formatting citations...</i>");
	
		console.time("formatCitations");

		formattedResult = formatCitations(
			style, CSLEDIT.exampleCitations.getCiteprocReferences(), CSLEDIT.exampleCitations.getCitations(), true);
		
		console.timeEnd("formatCitations");

		statusOut.html(formattedResult.statusMessage);

		// add syntax highlighting at highest level
		if (typeof citationNodeCslId !== "undefined") {
			citationTagStart = '<p><span cslid="' + citationNodeCslId + '">';
		    citationTagEnd = '</span></p>';
		}
		if (typeof bibliographyNodeCslId !== "undefined") {
			bibliographyTagStart = '<p><span cslid="' + bibliographyNodeCslId + '">';
			bibliographyTagEnd = '</span></p>';
		}

		oldFormattedCitation = newFormattedCitation;
		newFormattedCitation = citationTagStart;
		newFormattedCitation += formattedResult.formattedCitations.join(
			citationTagEnd + citationTagStart);
		newFormattedCitation += citationTagEnd;

		oldFormattedBibliography = newFormattedBibliography;
		newFormattedBibliography = bibliographyTagStart;
		newFormattedBibliography += formattedResult.formattedBibliography.join(
			bibliographyTagEnd + bibliographyTagStart);
		newFormattedBibliography += bibliographyTagEnd;

		if (newFormattedBibliography.indexOf("<second-field-align>") > -1) {
			exampleOut.css({
				// TODO: don't change the whole output panel CSS, just the relevant lines
				"padding-left" : "2.5em",
				"text-indent" : "-2em"
			});
		} else {
			exampleOut.css({
				"padding-left" : "0.5em",
				"text-indent" : "0"
			});
		}

		// lazy instantiation of diff_match_patch
		if (dmp === null) {
			dmp = new diff_match_patch();
		}

		citationDiffs =
			dmp.diff_main(stripTags(oldFormattedCitation, "span"), stripTags(newFormattedCitation, "span"));
		dmp.diff_cleanupSemantic(citationDiffs);
		diffFormattedCitation = unescape(CSLEDIT.diff.prettyHtml(citationDiffs));

		bibliographyDiffs =
			dmp.diff_main(stripTags(oldFormattedBibliography, "span"), stripTags(newFormattedBibliography, "span"));
		dmp.diff_cleanupSemantic(bibliographyDiffs);
		diffFormattedBibliography = unescape(CSLEDIT.diff.prettyHtml(bibliographyDiffs));

		if (dmp.diff_levenshtein(citationDiffs) === 0 && dmp.diff_levenshtein(bibliographyDiffs) === 0) {
			citationsOut.html(newFormattedCitation);
			bibliographyOut.html(newFormattedBibliography);
			if (typeof callback !== "undefined") {
				callback();
			}
		} else {
			if (CSLEDIT.storage.getItem('CSLEDIT.options.visualEditorDiffs') === "true") {
				// display the diff
				citationsOut.html(diffFormattedCitation);
				bibliographyOut.html(diffFormattedBibliography);

				// display the new version in 1000ms
				clearTimeout(diffTimeout);
				diffTimeout = setTimeout(
					function () {
						citationsOut.html(newFormattedCitation);
						bibliographyOut.html(newFormattedBibliography);
						if (typeof callback !== "undefined") {
							callback();
						}
					},
				1000);
			} else {
				// display the real result
				citationsOut.html(newFormattedCitation);
				bibliographyOut.html(newFormattedBibliography);
				if (typeof callback !== "undefined") {
					callback();
				}
			}
		}
		
		console.timeEnd("runCiteprocAndDisplayOutput");
	}