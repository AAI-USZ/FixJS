function PluginsManager() {

	// TODO comment

	this.Initialize = function () {

		Helpers.Log("PluginsManager: Initializing...");



		this.RegisterPlugins(GlobalPluginsList);

	}





	/**************************************************************************

	 *

	 * Registers all available plugins from

	 * the list passed

	 *

	 *************************************************************************/

	this.RegisterPlugins = function (pluginsToRegister) {

		Helpers.DLog("PluginsManager: Registering [" + pluginsToRegister.length + "] plugins");



		$.each(

			pluginsToRegister,

			function (index, obj) {

				RegisterPlugin(obj);

			}

		);

	};



	var RegisterPlugin = function (pluginMetadata) {

		var activeStateRequest = new Request("Background", "Data", "PluginActive" + pluginMetadata.Name, "get", null);

		var isLoaded = false;



		// Send request and handle callback

		activeStateRequest.Send(

			function (response) {

				if (response == "On" || !response) {

					Helpers.Log("PluginsManager: Plugin '" + pluginMetadata.Name + "' is active...");

					Helpers.Log("PluginsManager: Registering '" + pluginMetadata.Name + "'");



					var pluginObject = new pluginMetadata.Class();

					pluginObject.Register();

				}

				else Helpers.Log("PluginsManager: Plugin '" + pluginMetadata.Name + "' is NOT active!");



				var isLoaded = true;

			}

		);

	};

}