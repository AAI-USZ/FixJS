function () {

		Helpers.Log("DevelopmentToolbar: Registering DevelopmentToolbar plugin...");



		// Check if plugin can be active

		if (IsDevelopmentMode == false) {

			Helpers.Log("DevelopmentToolbar: Not in development mode");

			return;

		}



		// Activate plugin message

		Helpers.Log("DevelopmentToolbar: Extension is in development mode - plugin set to active.");



		// Creates new development toolbar source code

		var toolbar = this.GetNewToolbar(

 			this.GetNewLabel("Project - Axeman"),

 			this.GetNewButton("PluginManager", Helpers.GetExtensionRootURL("/Pages/PluginsManager.html")),

			this.GetNewButton("Popup", Helpers.GetExtensionRootURL("/Pages/Popup.html")),

			this.GetNewButton("StorageDetails", Helpers.GetExtensionRootURL("/Pages/StorageDetails.html"))

 		);



		// Appends style and code to current page

		$("head").append(this.GetDevelopmentToolbarStyle());

		$("body").append(toolbar);

	}