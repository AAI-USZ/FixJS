function () {

		Log("DevelopmentToolbar: Registering DevelopmentToolbar plugin...");



		// Check if plugin can be active

		if (IsDevelopmentMode == false) {

			Log("DevelopmentToolbar: Not in development mode");

			return;

		}



		// Activate plugin message

		Log("DevelopmentToolbar: Extension is in development mode - plugin set to active.");



		// Creates new development toolbar source code

		var toolbar = this.GetNewToolbar(

 			this.GetNewLabel("Project - Axeman"),

 			this.GetNewButton("PluginManager", GetURL("/Pages/PluginsManager.html")),

			this.GetNewButton("Popup", GetURL("/Pages/Popup.html")),

			this.GetNewButton("StorageDetails", GetURL("/Pages/StorageDetails.html"))

 		);



		// Appends style and code to current page

		$("head").append(this.GetDevelopmentToolbarStyle());

		$("body").append(toolbar);

	}