function () {

		Helpers.Log("App: Initialization started...");



		// Default settings

		$.ajaxSetup({ cache: false });



		// Inject Project Axeman styles

		$("head").append("<link href='" + Helpers.GetExtensionRootURL("Pages/PAStyles.css") + "' type='text/css' rel='stylesheet' />");



		// Initialize Modal View

		this.InitializeModalView();

		this.isModalViewActive = false;



		// Get active page

		this.GetActivePage();



		this.Load();

	}