function DevelopmentToolbar() {

	/**************************************************************************

	 *

	 * Registers Developer toolbar plugin

	 *

	 *************************************************************************/

	this.Register = function () {

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

	};



	// TODO: Comment function

	this.GetDevelopmentToolbarStyle = function () {

		var style =

			'<style type="text/css">' +

				// Toolbar style

				'.DTBase {' +

					'position:fixed;' +

					'bottom: 0px; right: 0px; left: 0px;' +

					'padding: 5px;' +

					'background: -webkit-gradient(linear, left top, left bottom, from(#D3D3D3), to(#919191));' +

				'}' +

				// Button style

				'.DTButton:link, ' +

				'.DTButton:hover, ' +

				'.DTButton:visited, ' +

				'.DTButton:active, ' +

				'.DTButton {' +

					'color: lightgray;' +

					'background: -webkit-gradient(linear, left top, left bottom, from(#747474), to(#4B4B4B));' +

					'padding: 2px 8px 2px 8px;' +

					'border-radius: 10px;' +

				'}' +

				// Label style

				'.DTLabelNormal:link, ' +

				'.DTLabelNormal:hover, ' +

				'.DTLabelNormal:visited, ' +

				'.DTLabelNormal:active, ' +

				'.DTLabelNormal {' +

					'padding: 0px 10px;' +

					'color: black;' +

				'}' +

				// InfoLabel style

				'.DTLabelInfo:link, ' +

				'.DTLabelInfo:hover, ' +

				'.DTLabelInfo:visited, ' +

				'.DTLabelInfo:active, ' +

				'.DTLabelInfo {' +

					'color: gray;' +

				'}' +

				// WarnLabel style

				'.DTLabelWarn:link, ' +

				'.DTLabelWarn:hover, ' +

				'.DTLabelWarn:visited, ' +

				'.DTLabelWarn:active, ' +

				'.DTLabelWarn {' +

					'color: red;' +

				'}' +

			'</style>';



		return style;

	};



	// TODO: Comment function

	this.GetNewLabel = function (content) {

		Helpers.DLog("DevelopmentToolbar: Creating new label '" + content + "'");



		return '<a class="DTLabelNormal" href="#">' + content + '</a>';

	};



	// TODO: Comment function

	this.GetNewLabelInfo = function (content) {

		Helpers.DLog("DevelopmentToolbar: Creating new InfoLabel '" + content + "'");



		return '<a class="DTLabelNormal DTLabelInfo" href="#">' + content + '</a>';

	};



	// TODO: Comment function

	this.GetNewLabelWarn = function (content) {

		Helpers.DLog("DevelopmentToolbar: Creating new WarnLabel '" + content + "'");



		return '<a class="DTLabelNormal DTLabelWarn" href="#">' + content + '</a>';

	};



	// TODO: Comment function

	this.GetNewToolbar = function () {

		Helpers.DLog("DevelopmentToolbar: Creating new Toolbar with [" + arguments.length + "] components.");



		var toolbarSource = '<div class="DTBase" id="DevelopmentToolbar">';

		for (var index = 0; index < arguments.length; index++) {

			toolbarSource += arguments[index];

		}

		toolbarSource += '</dev>';



		return toolbarSource;

	};



	// TODO: Comment function

	this.GetNewButton = function (content, reference) {

		Helpers.DLog("DevelopmentToolbar: Creating new Button of content '" + content + "'");



		return '<a class="DTButton" target="_blank" href="' + reference + '">' + content + '</a>&nbsp;&nbsp;&nbsp;&nbsp;'

	};

}