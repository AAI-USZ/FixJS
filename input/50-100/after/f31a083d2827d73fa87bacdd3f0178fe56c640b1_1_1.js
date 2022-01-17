function () {

		Log("App: Initialization started...");



		// Default settings

		$.ajaxSetup({ cache: false });



		// Inject Project Axeman styles

		var stylesheet = $("<link>");

		stylesheet.attr("href", GetURL("Pages/PAStyles.css"));

		stylesheet.attr("type", "text/css");

		stylesheet.attr("rel", "stylesheet");

		$("head").append(stylesheet);



		// Initialize Modal View

		this.InitializeModalView();

		this.isModalViewActive = false;



		// Get active page

		this.GetActivePage();



		this.Load();

	}