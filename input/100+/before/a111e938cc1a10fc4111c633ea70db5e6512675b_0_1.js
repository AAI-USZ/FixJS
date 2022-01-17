function () {
		cslEditor = new CSLEDIT.VisualEditor('#visualEditorContainer',	
			{
				loadCSLName : "Load Style",
				loadCSLFunc : loadCSL,

				saveCSLName : 'Save Style',
				saveCSLFunc : saveCSL,
				rootURL : rootURL
			});
	}