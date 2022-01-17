function (participants, pluginIndex) {

		pluginIndex = pluginIndex || 0;
		_currentPluginIndex = pluginIndex;
		if (typeof _mediaPlayer !== "undefined") {
			_mediaPlayer.playEvent("pluginHighlight");
			_mediaPlayer.pause();
		}

		var selectedPlugin = _plugins[pluginIndex];

		$("#partyMachinePluginContainer").empty();

		var milliseconds = new Date().getTime();

		if (selectedPlugin.url.indexOf('?') === -1) {
			_currentPluginSrc = selectedPlugin.url
				+ '?baseUrl=' + encodeURIComponent(partyMachineConfig.baseUrl)
				+ '&loader=' + encodeURIComponent(partyMachineConfig.baseUrl) + 'partymachine.client.loader.js'
				+ '&' + milliseconds + '=' + milliseconds 
				+ "#" + encodeURIComponent(document.location.href);
		}
		else {
			_currentPluginSrc = selectedPlugin.url
				+ '&baseUrl=' + encodeURIComponent(partyMachineConfig.baseUrl)
				+ '&loader=' + encodeURIComponent(partyMachineConfig.baseUrl) + 'partymachine.client.loader.js'
				+ '&' + milliseconds + '=' + milliseconds 
				+ "#" + encodeURIComponent(document.location.href);
		}
		
		$("#partyMachine").hide();

		$('<iframe id="partyMachinePlugin" name="partyMachinePlugin" src="' + _currentPluginSrc + '" scrolling="no" frameborder="0" height="100%" width="100%" style="display:block;position:absolute;z-index:1001;">')
			.appendTo("#partyMachinePluginContainer");

        for(var p = 0; p < participants.length; p++) {
            var participant = participants[p];
            participant.gameController = {};
        }

		$("#partyMachinePlugin").load(function () {
			$("#partyMachinePlugin").focus();
		});


	}