function (style, documents, citationClusters, taggedOutput) {
		var bibliography,
			result,
			sys,
			citations,
			cluster,
			inLineCitations,
			inLineCitationArray,
			i,
			pos,
			makeBibliographyArgument,
			hangingindent,
			has_bibliography,
			index,
			enumerateCitations;

		// TODO: this shouldn't be a global
		jsonDocuments = documents;

		result = { "statusMessage":"", "formattedCitations":[], "formattedBibliography": [] };
		result.statusMessage = "";
		if (style !== previousStyle) {
			try
			{
				sys = new Sys(abbreviations);
				citeproc = new CSL.Engine(sys, style);
				citeproc.opt.development_extensions.csl_reverse_lookup_support = true;
				previousStyle = style;
			}
			catch(err)
			{
				result.statusMessage = "Citeproc initialisation exception: " + err;
				return result;
			}
		} else {
			citeproc.restoreProcessorState([]);
		}
		
		inLineCitations = "";
		inLineCitationArray = new Array();
		
		for (cluster=0; cluster<citationClusters.length; cluster++)
		{
			try
			{
				citations = citeproc.appendCitationCluster(citationClusters[cluster],false);
			}
			catch(err)
			{
				result.statusMessage = "Citeproc exception: " + err;
				return result;
			}
			
			for (i = 0; i < citations.length; i++)
			{
				pos = citations[i][0];
				
				if (inLineCitations != "")
				{
					inLineCitations += "<br>";
				}
				
				if (taggedOutput !== true) {
					citations[i][1] = stripTags(citations[i][1], "span");
				}

				inLineCitations += citations[i][1];
				inLineCitationArray.push(citations[i][1]);
			}
		}
		result.formattedCitations = inLineCitationArray;
		
		enumerateCitations = true;
		if (enumerateCitations === true) {
			makeBibliographyArgument = undefined;
		}
		else {
			makeBibliographyArgument = "citation-number";
		}
		
		try
		{
			bibliography = citeproc.makeBibliography(makeBibliographyArgument);
		}
		catch(err)
		{
			result.statusMessage = "Citeproc exception: " + err;
			return result;
		}

		hangingindent = false;
		has_bibliography = (bibliography !== false);

		if (has_bibliography)
		{
			hangingindent = (bibliography[0].hangingindent != 0 && "undefined" !== typeof(bibliography[0].hangingindent));
			bibliography = bibliography[1];
		}
		else
		{
			bibliography = [[(citations[0][1])]];
		}

		if (taggedOutput !== true) {
			for (index = 0; index < bibliography.length; index++) {
				bibliography[index] = stripTags(bibliography[index], "span");
			}
		}

		result.formattedBibliography = bibliography;
		return result;
	}