function (e) {
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
			}