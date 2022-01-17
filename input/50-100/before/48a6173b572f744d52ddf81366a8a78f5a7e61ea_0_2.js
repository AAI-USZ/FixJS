function (data) {
					if (data && data.id) {
						player.play({
							song_id : data.id,
							playlist_id : p.playlist_id,
							playlist_name : p.playlist_name,
							position : p.position + 1
						});
					} else {
						player.stop();
					}
				}