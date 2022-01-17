function () {
			var userOnChangeCallback = CSLEDIT.options.get("onChange"),
				citationEditor1,
				citationEditor2;
			
			syntaxHighlighter = CSLEDIT.SyntaxHighlighter(editorElement);

			CSLEDIT.viewController = CSLEDIT.ViewController(
				editorElement.find("#treeEditor"),
				editorElement.find("#titlebar"),
				editorElement.find("#elementProperties"),
				editorElement.find("#nodePathView"),
				setupDropdownMenuHandler,
				syntaxHighlighter);

			CSLEDIT.controller.setCslData(CSLEDIT.data);
			CSLEDIT.data.addViewController(CSLEDIT.viewController);

			if (typeof userOnChangeCallback === "function") {
				CSLEDIT.data.addViewController({
					styleChanged : function (command) {
						if (command === "formatCitations") {
							userOnChangeCallback();
						}
					}
				});
			}

			createTreeView();
		}