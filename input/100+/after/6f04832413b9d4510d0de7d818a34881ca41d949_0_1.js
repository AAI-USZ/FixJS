function (data) {

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
//						url: partyMachineConfig.pluginsBaseUrl + "King%20Pong/index.html"
//					};

//					data.plugins.push(kingPong);

					pluginRunner.start(mediaPlayer, data.plugins);

					controllers.start(freshParticipants);

					atPluginSelect(freshParticipants);

					mediaPlayer.start($.shuffle(data.media));
				}