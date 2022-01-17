function LoadExamplesToTableCallback(exampleRows)
		{
			var dataTable1 = $("#exampleTable").data("dataTable");
			dataTable1.fnClearTable(false);
			for (var i=0; i < exampleRows.length; ++i) {
				var doc = exampleRows[i].value;
				if (!doc || (doc.head.contentType != "chiasm" && doc.head.contentType != "outline" && doc.head.contentType != "panel"))
					continue;
				var authorProfile = collectProfileDocs("personProfile", exampleRows, function(rowDoc){
							if (rowDoc.head.contentType == "personProfile" && 
			    				doc.head.author && rowDoc._id == doc.head.author.guid )
						    		return true;
						    	return false;
						}, true );
  				var submitterProfile = collectProfileDocs("personProfile", exampleRows, function(rowDoc){
							if (rowDoc.head.contentType == "personProfile" && 
			    				doc.head.submittedBy && rowDoc._id == doc.head.submittedBy.guid )
						    		return true;
						    	return false;
						}, true );
				
				var dataTable1 = $("#exampleTable").data("dataTable");
				var iSettings = dataTable1.fnAddData(
					[	
						formatScriptureRange(doc.head.ScriptureRange, "") + "<br/>" + doc.head.contentType, 
						doc.head.title,
						formatName(authorProfile, ""), 
						formatSource(doc, ""), 
						formatSubmissionTimestamp(doc.head.submissionTimestamp), 
						formatName(submitterProfile, "")],
						false /* don't redraw */
				);
				var drow = dataTable1.fnSettings().aoData[iSettings[0]];
				$(drow.nTr)
					.addClass("exampleRow")
					.attr("id", exampleRows[i].id)
					.click(function(event) 
					{
						selectOutlineRow($(this)); 
		  				return false;
					});
				dataTable1.fnDraw();
			};			
		}