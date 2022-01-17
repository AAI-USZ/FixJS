function (data) {
					if (data.song && data.song.id) {
						player.play({
							song_id : data.song.id,
							playlist_id : p.playlist_id,
							playlist_name : p.playlist_name,
							position : p.position - 1
						});
					} else {
						player.stop();
					}
				}