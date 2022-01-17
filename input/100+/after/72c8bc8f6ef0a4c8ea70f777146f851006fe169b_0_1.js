function () {
		ok(true, "schema loaded");

		CSLEDIT.data = CSLEDIT.Data("CSLEDIT.testData");
		CSLEDIT.data.setCslCode(styles[Object.keys(styles)[0]]);

		CSLEDIT.viewController = CSLEDIT.ViewController(
			$('<div/>'), $('<div/>'), $('<div/>'), $('<div/>'),
			fakeDropdownMenuHandler,
			fakeSyntaxHighlighter
		);
		
		CSLEDIT.data.addViewController(CSLEDIT.viewController);
		
		CSLEDIT.viewController.init(CSLEDIT.data.get(), {
			formatCitations : function () { 
				processNextStyle();
			},
			//deleteNode : function () {},
			//moveNode : function () {},
			//checkMove : function () {},
			viewInitialised : function () {}
		});
	}