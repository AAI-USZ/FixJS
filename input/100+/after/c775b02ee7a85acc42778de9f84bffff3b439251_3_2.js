function (pluginDevelopment) {

		var partyParams = partyMachine.getUrlParams();

		if (typeof pluginDevelopment !== "undefined" || pluginDevelopment != null) {
			pluginRunner.stub();
			controllers.stub();
			participants.stub();

			var stubbedParticipants = participants.getAllParticipants();

			pluginRunner.startPlugin(stubbedParticipants, _state.currentlySelectedPlugin);

		} else if (typeof partyParams["id"] === "undefined" || partyParams["id"] == null) {
			pluginRunner.stub();
			controllers.stub();
			participants.stub();

		} else {
			// We dont have a fully working controller solution
			controllers.stub();

			// We dont have a fully working runner yet..
			// pluginRunner.stub();

			var feedUrl = partyMachineConfig.partyFeedUrl + "?jsoncallback=?" + '&id=' + partyParams["id"]
			$.ajax({
				url: feedUrl,
				jsonp: true,
				dataType: 'json',
				success: function (data) {

					var freshParticipants = [];

					$('#partyname').html('<p>' + data.name + '</p>');

					if (data.participants && data.participants.length > 0) {
						$.each(data.participants, function (key, m) {
							m.status = "active";
							freshParticipants.push(m);
						});
					}

					$.shuffle(freshParticipants);

					participants.start(feedUrl, freshParticipants);

					var kingPong = {
						created: new Date(),
						createdBy: {
							id: "3cef56f0-28fc-48c5-8f97-04f10d4ef26e",
							imageUrl: "http://i.imgur.com/0ul5i.png",
							name: "Jonas Olsson"
						},
						id: "e9ef04b3-8603-4eaa-8f13-044a2746d22b",
						title: "King Pong!",
						url: partyMachineConfig.pluginsBaseUrl + "King%20Pong/index.html"
					};

					data.plugins.push(kingPong);

					pluginRunner.start(mediaPlayer, data.plugins);

					controllers.start(freshParticipants);

					atPluginSelect(freshParticipants);

					mediaPlayer.start($.shuffle(data.media));
				}
			});
		}

		// Setup a callback to handle the dispatched MessageEvent event. In cases where
		// window.postMessage is supported, the passed event will have .data, .origin and
		// .source properties. Otherwise, this will only have the .data property.
		$.receiveMessage(function (e) {

			var data = JSON.parse(e.data);

			if (data.event === "iframe_resize") {
				pluginRunner.adjustPlugin(data);
			} else if (data.event === "getParticipants") {
				pluginRunner.sendParticipants(participants.getActiveParticipants());
			} else if (data.event === "pluginExit") {

				pluginRunner.exitPlugin();

				_state.context = _contexts.atPluginSelection;

				mediaPlayer.resume();

				atPluginSelect(participants.getActiveParticipants());
				resetParticipantTimeout();
				resetMediaTimeout();
			} else {
				//console.log("unknown message recieved: " + data);
			}
		});

		resetParticipantTimeout();
		resetMediaTimeout();
	}