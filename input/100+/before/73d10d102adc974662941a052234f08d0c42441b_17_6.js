function () {
		formatFindByStyleExampleDocument();
		$("#inputTabs").tabs({
			show: function (event, ui) {
				if (ui.panel.id === "styleNameInput") {
					$("#styleNameResult").show();
					$("#styleFormatResult").hide();
				} else {
					$("#styleNameResult").hide();
					$("#styleFormatResult").show();
				}
			}
		});
		$.cleditor.defaultOptions.width = 390;
		$.cleditor.defaultOptions.height = 100;
		$.cleditor.defaultOptions.controls =
			"bold italic underline subscript superscript ";
		//		+ "| undo redo | cut copy paste";

		$('button#searchButton').css({
			'background-image' :
				"url(" + CSLEDIT.options.get('rootURL') + '/external/famfamfam-icons/magnifier.png)'
		});

		var userCitationInput = $("#userCitation").cleditor({height: 55})[0];
		$("#userBibliography").cleditor({height: 85});

		var realTimeSearch = false;
		if (realTimeSearch) {
			$("#userCitation").cleditor()[0].change(formChanged);
			$("#userBibliography").cleditor()[0].change(formChanged);
			$('#searchButton').hide();
		} else {
			$("#userCitation").cleditor()[0].change(clearResults);
			$("#userBibliography").cleditor()[0].change(clearResults);
			$('#searchButton').on("click", function () {
				$("#styleFormatResult").html("<i>Searching...</i>");
				formChanged();
			});
		}
	
		// prepopulate search by style format with APA example
		$("#userCitation").cleditor()[0].doc.body.innerHTML =
			exampleCitations.exampleCitationsFromMasterId["http://www.zotero.org/styles/apa"].
			formattedCitations[0];
		$("#userBibliography").cleditor()[0].doc.body.innerHTML =
			exampleCitations.exampleCitationsFromMasterId["http://www.zotero.org/styles/apa"].
			formattedBibliography;

		formChanged();
	}