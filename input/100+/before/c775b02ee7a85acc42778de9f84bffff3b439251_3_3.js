function (partyMachine, controllers, pluginRunner, participants, mediaPlayer, $, undefined) {

	var partyFeedUrl = 'http://partymaskinen.se/Party/JsonP';

	var _contexts = {
		atPluginSelection: 0,
		runningPlugin: 1
	};

	var _state = {
		context: _contexts.atPluginSelection,
		currentlySelectedPlugin: 0
	};

	var _participantTimeoutTimer;
	var _participantTimeoutDateTime = null;

	var _mediaTimeoutTimer;
	var _mediaTimeoutTimerDelay = 1000 * 60 * 5;

	partyMachine.getUrlParams = function () {
		var urlParams = {};
		(function () {
			var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&=]+)=?([^&]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = window.location.search.substring(1);

			while (e = r.exec(q))
				urlParams[d(e[1])] = d(e[2]);
		})();

		return urlParams;
	};

	function resetParticipantTimeout() {

		if (_participantTimeoutTimer !== null)
			window.clearTimeout(_participantTimeoutTimer);

		_participantTimeoutDateTime = new Date();
		_participantTimeoutDateTime.setTime(_participantTimeoutDateTime.getTime() + (10 * 60 * 1000));

		_participantTimeoutTimer = window.setTimeout("window.partyMachine.updateParticipantTimeout()", 1000);
	};

	function resetMediaTimeout() {

		if (_mediaTimeoutTimer !== null)
			window.clearTimeout(_mediaTimeoutTimer);

		_mediaTimeoutTimer = window.setTimeout("window.partyMachine.updateMediaTimeout()", _mediaTimeoutTimerDelay);

	}

	function atPluginSelect(freshParticipants) {

		var currentParticipant = participants.getNextParticipant();
		var CP = currentParticipant.description;

		if (CP == null) {
			CP = "Jag orkade inte skriva description =(";
		}

		$("#participant-image").html('<img src="' + currentParticipant.imageUrl + '"></img>');
		$("#participant-name").html('<p>' + currentParticipant.name + '</p>' + '<i>' + '"' + CP + '"' + '</i>');

		partyMachine.bindKeys(freshParticipants);
	}

	partyMachine.bindKeys = function (freshParticipants) {

		var buttonsPressed = function (buttonA, buttonB, buttonC, buttonD) {

			var anyButton = buttonA || buttonB || buttonC || buttonD;

			if (!anyButton) {
				return false;
			}

			var plugins = pluginRunner.getPlugins();

			if (_state.context !== _contexts.atPluginSelection) {
				return false;
			}

			if (plugins.length === 0) {
				return false;
			}

			pluginRunner.startPlugin(freshParticipants, _state.currentlySelectedPlugin);

		};

		var gamepadPressed = function (left, up, right, down) {

			var anyButton = left || up || right || down;

			if (!anyButton) {
				return false;
			}

			var plugins = pluginRunner.getPlugins();

			if (_state.context !== _contexts.atPluginSelection) {
				return false;
			}

			if (plugins.length === 0) {
				return false;
			}

			if (right) {
				if (_state.currentlySelectedPlugin + 1 >= plugins.length) {
					_state.currentlySelectedPlugin = 0;
				} else {
					_state.currentlySelectedPlugin += 1;
				}
			} else if (left) {
				if (_state.currentlySelectedPlugin <= 0) {
					_state.currentlySelectedPlugin = plugins.length - 1;
				} else {
					_state.currentlySelectedPlugin -= 1;
				}
			} else if (up) {
				_state.currentlySelectedPlugin = ((_state.currentlySelectedPlugin + 4) % 8);
			} else if (down) {
				_state.currentlySelectedPlugin = ((_state.currentlySelectedPlugin + 4) % 8);
			}

			pluginRunner.highlightPlugin(_state.currentlySelectedPlugin);

		};

		setTimeout(function () {
			controllers.mapControllers(
                gamepadPressed,
                function () { },
                buttonsPressed,
                function () { },
                function () { }
            );
		}, 1000)


	},
	partyMachine.updateParticipantTimeout = function () {

		var dateNow = new Date();
		var nTimeDiff = _participantTimeoutDateTime.getTime() - dateNow.getTime();
		var oDiff = new Object();

		oDiff.days = Math.floor(nTimeDiff / 1000 / 60 / 60 / 24);
		nTimeDiff -= oDiff.days * 1000 * 60 * 60 * 24;

		oDiff.hours = Math.floor(nTimeDiff / 1000 / 60 / 60);
		nTimeDiff -= oDiff.hours * 1000 * 60 * 60;

		oDiff.minutes = Math.floor(nTimeDiff / 1000 / 60);
		nTimeDiff -= oDiff.minutes * 1000 * 60;

		oDiff.seconds = Math.floor(nTimeDiff / 1000);

		$("#participant-timer").html("<i>Nästa deltagare om:</i><br />" + '<p>' + (oDiff.minutes < 10 ? '0' : '') + oDiff.minutes + ':' + (oDiff.seconds < 10 ? '0' : '') + oDiff.seconds + '</p>');

		if (oDiff.minutes == 0 && oDiff.seconds == 0) {
			//TODO: switch participant when time runs out, not on plugin select (no method getParticipants)
			atPluginSelect(participants.getNextParticipant());
			//TODO: Play sound?
			resetParticipantTimeout();
		} else {
			_participantTimeoutTimer = window.setTimeout("window.partyMachine.updateParticipantTimeout()", 1000);
		}
	},

	partyMachine.updateMediaTimeout = function () {

		var partyParams = partyMachine.getUrlParams();
		var feedUrl = partyFeedUrl + "?jsoncallback=?" + '&id=' + partyParams["id"];

		$.ajax({
			url: feedUrl,
			jsonp: true,
			dataType: 'json',
			success: function (data) {

				mediaPlayer.update(data.media);
			}
		});

		_mediaTimeoutTimer = window.setTimeout("window.partyMachine.updateMediaTimeout()", _mediaTimeoutTimerDelay);
	},

	partyMachine.start = function (pluginDevelopment) {

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

			var feedUrl = partyFeedUrl + "?jsoncallback=?" + '&id=' + partyParams["id"]
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

					//					var kingPong = {
					//						created: new Date(),
					//						createdBy: {
					//							id: "3cef56f0-28fc-48c5-8f97-04f10d4ef26e",
					//							imageUrl: "http://i.imgur.com/0ul5i.png",
					//							name: "Jonas Olsson"
					//						},
					//						id: "e9ef04b3-8603-4eaa-8f13-044a2746d22b",
					//						title: "King Pong!",
					//						url: "http://localhost:50775/PartymaskinenPlugins/King%20Pong/index.html"
					//					};

					//data.plugins.push(kingPong);

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
	},

	partyMachine.update = function (pluginDevelopment) {

		// Skulle koda här lite...
	};
}