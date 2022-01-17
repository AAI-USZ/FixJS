function (xhr) {
					if (xhr.status === 404) {
						player.stop();
					} else {
						wsl.ajaxError("Failed to get next song in playlist", xhr);
					}
				}