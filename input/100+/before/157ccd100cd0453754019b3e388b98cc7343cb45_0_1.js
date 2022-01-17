function (data) {
				var song, artist, album, art;
				song = data.song;
				artist = data.artist;
				album = data.album;

				player.destroySound();
				player.song = song;
				player.playing = playing;
				player.playing.album_id = album.id;
				player.playing.artist_id = artist.id;

				$('.playing').removeClass('playing');
				$('#play').addClass('pause');
				$('#player').fadeIn(300);
				$('#navbar-playing').show();

				$('#playing-title').html('<a title="' + song.title + '">' + song.title + '</a><br>');
				$('#playing-album').empty().html('<a title="' + album.name + '" onclick="wsl.load(\'?songs/' + album.id + '\')" class="playing-album">' + (album.name || ' ') + '</a>');
				$('#playing-artist').empty().html('<a title="' + artist.name + '" onclick="wsl.load(\'?albums/' + artist.id + '\')" class="playing-artist">' + (artist.name || ' ') + '</a>');

				$('#playing').show();

				if (album.artwork) {
					art = '<img src="/wissl/art/' + album.id + '" />';
				} else {
					art = '<img src="img/no-artwork.jpg" />';
				}
				$('#art').empty().html(art);

				if (song.title && song.title !== '') {
					document.title = song.title;
				} else {
					document.title = 'wissl';
				}

				if (playing) {
					$('#playlist-' + playing.playlist_id + '-' + playing.position).addClass('playing');
					$('#song-' + song.id).addClass('playing');
					$('#album-' + album.id).addClass('playing');
					$('#artist-' + artist.id).addClass('playing');
				}

				if (!player.hasSound) {
					wsl.error("Cannot play " + song.title + ": no sound");
					return;
				}

				player.sound = soundManager.createSound({
					id : "song_" + song.id,
					url : "/wissl/song/" + song.id + "/stream?sessionId=" + wsl.sessionId,
					type : data.song.format,
					autoPlay : true,
					onfinish : function () {
						player.next();
					},
					onplay : function () {
					},
					whileplaying : function () {
						var width, w1, w2, d1, d2, t, kbps, vol;

						if (player.sound.muted !== player.mute) {
							if (player.mute) {
								player.sound.mute();
							} else {
								player.sound.unmute();
							}
						}
						$('#volume-slider-full').height(player.volume * $('#volume-slider').height() / 100);
						player.sound.setVolume(Math.pow(player.volume / 100, 3) * 100);
						vol = $('#volume-icon');
						vol.removeClass();
						if (player.mute) {
							vol.addClass('volume-mute');
						} else {
							if (player.volume > 75) {
								vol.addClass('volume-high');
							} else if (player.volume > 50) {
								vol.addClass('volume-medium');
							} else if (player.volume > 25) {
								vol.addClass('volume-low');
							} else {
								vol.addClass('volume-zero');
							}
						}

						player.song.duration = player.sound.durationEstimate / 1000;
						width = $("#progress").width();
						w1 = (player.sound.position / (player.song.duration * 1000)) * width;
						w2 = (player.sound.bytesLoaded / player.sound.bytesTotal) * width;
						d1 = wsl.formatSeconds(player.sound.position / 1000);
						d2 = wsl.formatSeconds(player.song.duration);
						$("#progress-played").width(w1);
						$("#progress-download").width(w2);
						$("#position").html('<strong>' + d1 + "</strong> / " + d2);

						if (player.sound.bytesLoaded !== player.sound.bytesTotal) {
							t = new Date().getTime();
							if (!player.sound.t) {
								player.sound.t = t;
								player.sound.bytesAtT = player.sound.bytesLoaded;
							}
							if (t - player.sound.t > 1000) {
								kbps = Math.ceil((player.sound.bytesLoaded - player.sound.bytesAtT) / 1024);
								$('#download-rate').empty().html(kbps + 'Kbps').show();
								player.sound.t = t;
								player.sound.bytesAtT = player.sound.bytesLoaded;
							}
						} else {
							$('#download-rate').hide();
						}
					}
				});
			}