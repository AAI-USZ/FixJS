function (player) {
		var jqPlayer = $(player),
			playerId = jqPlayer.attr('id'),
			list = $('table[rel=' + playerId + ']'),
			marks = list.find('tr'),
			canplay = false;

		if (players.length === 1) {
			// check if deeplink is set
			checkCurrentURL();
		}

		// chapters list
		list
			.show()
			.delegate('a', 'click', function (e) {
				e.preventDefault();

				var mark = $(this).closest('tr'),
					startTime = mark.data('start'),
					endTime = mark.data('end');

				// If there is only one player also set deepLink
				if (players.length === 1) {
					setFragmentURL('t=' + generateTimecode([startTime, endTime]));
				} else {
					if (canplay) {
						// Basic Chapter Mark function (without deeplinking)
						player.setCurrentTime(startTime);
					} else {
						jqPlayer.bind('canplay', function () {
							player.setCurrentTime(startTime);
						});
					}
				}

				if (player.pluginType !== 'flash') {
					player.play();
				}
			});

		// wait for the player or you'll get DOM EXCEPTIONS
		jqPlayer.bind('canplay', function () {
			canplay = true;

			// add Deeplink Behavior if there is only one player on the site
			if (players.length === 1) {
				jqPlayer.bind({
					play: checkTime,
					timeupdate: checkTime,
					pause: addressCurrentTime
					// disabled 'cause it overrides chapter clicks
					//seeked: addressCurrentTime
				}, {player: player});

				checkCurrentURL();

				// handle browser history navigation
				$(window).bind('hashchange onpopstate', checkCurrentURL);

				// handle links on the page
				// links added later are not handled!
				$('a').bind('click', function () {
					// if we stay on the page after clicking a link
					// check if theres a new deeplink
					window.setTimeout(checkCurrentURL, 100);
				});
			}

			// always update Chaptermarks though
			jqPlayer.bind('timeupdate', function () {
				updateChapterMarks(player, marks);
			});

		});
	}