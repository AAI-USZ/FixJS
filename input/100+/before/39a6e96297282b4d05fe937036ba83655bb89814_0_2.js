function (e) {
				e.preventDefault();

				var mark = $(this).closest('tr'),
					startTime = mark.data('start'),
					endTime = mark.data('end');

				// If there is only one player also set deepLink
				if (players.length === 1) {
					return setFragmentURL('t=' + generateTimecode([startTime, endTime]));
				}

				// Basic Chapter Mark function (without deeplinking)
				player.setCurrentTime(startTime);
				if (player.pluginType !== 'flash') {
					player.play();
				}
			}