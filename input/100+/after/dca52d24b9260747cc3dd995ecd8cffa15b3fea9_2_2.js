function (selector) {
		var dropdown = $(selector),
			loadCsl;

		dropdown.filter('a.menuLoadcsl').html(CSLEDIT.options.get('loadCSLName'));
		dropdown.filter('a.menuSavecsl').html(CSLEDIT.options.get('saveCSLName'));

		editorElement.find('#menuNewStyle').click(function () {
			// fetch the URL
			$.ajax({
				url : CSLEDIT.options.get("rootURL") + "/content/newStyle.csl",
				dataType : "text",
				success : function (cslCode) {
					console.log("csl code received: " + cslCode);
					CSLEDIT.controller.exec('setCslCode', [cslCode]);
				},
				error : function () {
					throw new Error("Couldn't fetch new style");
				},
				async : false
			});
//			CSLEDIT.controller.exec('setCslCode', [newStyle]);
		});

		editorElement.find('#menuLoadCsl').click(function () {
			var csl = CSLEDIT.options.get('loadCSLFunc')();
			if (csl !== null && typeof csl !== "undefined") {
				CSLEDIT.controller.exec('setCslCode', [csl]);
			}
		});
		
		editorElement.find('#menuLoadStyleFromUrl').click(function () {
			var styleURL = prompt("Please enter the URL of the style you want to load");

			if (typeof(styleURL) === "string" && styleURL !== "") {
				// fetch the URL
				$.ajax({
					url : '../getFromOtherWebsite.php?url=' + encodeURIComponent(styleURL),
					dataType : "text",
					success : function (newStyle) {
						CSLEDIT.controller.exec("setCslCode", [newStyle]);
					},
					error : function () {
						console.log("ajax error: style not loaded");
					},
					async : false
				});
			}
		});
		
		editorElement.find('#menuSaveCsl').click(function () {
			CSLEDIT.options.get('saveCSLFunc')(CSLEDIT.data.getCslCode());
		});
		
		editorElement.find('#menuUndo').click(function () {
			if (CSLEDIT.controller.commandHistory.length === 0) {
				alert("No commands to undo");
			} else {
				CSLEDIT.controller.undo();
			}
		});
		
		editorElement.find('#menuRedo').click(function () {
			if (CSLEDIT.controller.undoCommandHistory.length === 0) {
				alert("No commands to redo");
			} else {
				CSLEDIT.controller.redo();
			}
		});
		
		editorElement.find('#menuEditCitation1').click(function () {
			CSLEDIT.citationEditor.editCitation(0);
		});
		
		editorElement.find('#menuEditCitation2').click(function () {
			CSLEDIT.citationEditor.editCitation(1);
		});
	}