function (event) {
			var clickedName = $(event.target).text(),
				selectedNodeId = editorElement.find('#treeEditor').jstree('get_selected'),
				parentNode = $(event.target).parent().parent(),
				parentNodeName,
				parentNodeID,
				position,
				newStyle,
				styleURL;

			if (parentNode.attr("class") === "sub_menu")
			{
				parentNodeName = parentNode.siblings('a').text();

				if (/^Style/.test(parentNodeName)) {
					if (clickedName === "Revert (undo all changes)") {
						reloadPageWithNewStyle(styleURL);
					} else if ($(event.target).is('.savecsl')) {
						CSLEDIT.options.get('saveCSLFunc')(CSLEDIT.data.getCslCode());
					} else if ($(event.target).is('.loadcsl')) {
						var csl = CSLEDIT.options.get('loadCSLFunc')();
						if (csl !== null && typeof csl !== "undefined") {
							CSLEDIT.controller.exec('setCslCode', [csl]);
						}
					} else if (clickedName === "New Style") {
						// fetch the URL
						$.ajax({
							url : CSLEDIT.options.get("rootURL") + "/content/newStyle.csl",
							dataType : "text",
							success : function (result) {
								newStyle = result;
							},
							async : false
						});
						CSLEDIT.controller.exec('setCslCode', [newStyle]);
					} else if (clickedName === "Load Style from URL") {
						styleURL = prompt("Please enter the URL of the style you want to load"),

						// fetch the URL
						$.ajax({
							url : '../getFromOtherWebsite.php?url=' + encodeURIComponent(styleURL),
							dataType : "text",
							success : function (result) {
								newStyle = result;
							},
							async : false
						});

						CSLEDIT.controller.exec("setCslCode", [newStyle]);
					}
				} else if (parentNodeName === "Edit") {
					if (clickedName === "Undo") {
						if (CSLEDIT.controller.commandHistory.length === 0) {
							alert("No commands to undo");
						} else {
							CSLEDIT.controller.undo();
						}
					} else if (clickedName === "Redo") {
						if (CSLEDIT.controller.undoCommandHistory.length === 0) {
							alert("No commands to redo");
						} else {
							CSLEDIT.controller.redo();
						}
					}
				} else if (parentNodeName === "Example citations") {
					if (clickedName === "Citation 1") {
						CSLEDIT.citationEditor.editCitation(0);
					} else if (clickedName === "Citation 2") {
						CSLEDIT.citationEditor.editCitation(1);
					}
				}
			}
		}