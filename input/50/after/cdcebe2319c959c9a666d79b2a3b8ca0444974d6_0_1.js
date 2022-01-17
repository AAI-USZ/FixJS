function (xhr) {
					if (xhr.status === 404) {
						player.stop();
					} else {
						wsl.ajaxError("Failed to get previous song in playlist", xhr);
					}
				}