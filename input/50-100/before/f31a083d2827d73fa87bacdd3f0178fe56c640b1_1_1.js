function () {

		Log("App: Initialization started...");



		// Default settings

		$.ajaxSetup({ cache: false });



		// Inject Project Axeman styles

		$("head").append("<link href='" + GetURL("Pages/PAStyles.css") + "' type='text/css' rel='stylesheet' />");



		// Initialize Modal View

		this.InitializeModalView();

		this.isModalViewActive = false;



		// Get active page

		this.GetActivePage();



		this.Load();

	}