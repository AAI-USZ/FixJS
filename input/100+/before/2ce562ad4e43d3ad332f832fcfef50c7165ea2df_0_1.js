function (data) {

				var content, artists, albums, songs, i, claz, cb, link;

				artists = data.artists;
				albums = data.albums;
				songs = data.songs;
				content = '';

				content += '<form id="search-form" method="post" onsubmit="wsl.search();return false">';
				content += '<input id="search-input" type="text"';
				content += 'value="' + query + '"';
				content += 'placeholder="song, artist, album" />';
				content += '<input id="search-ok" type="submit"';
				content += 'value="Search"/>';
				content += '</form>';

				content += '<div id="search-results">';

				content += '<span id="search-results-tab-songs"';
				content += 'onclick="wsl.showSearchResult({songs:true});" ';
				content += 'class="search-result-tab">Songs (' + songs.length + ')</span>';

				content += '<span id="search-results-tab-albums" ';
				content += 'onclick="wsl.showSearchResult({albums:true});" ';
				content += 'class="search-result-tab">Albums (' + albums.length + ')</span>';

				content += '<span id="search-results-tab-artists" ';
				content += 'onclick="wsl.showSearchResult({artists:true});" ';
				content += 'class="search-result-tab">Artists (' + artists.length + ')</span>';

				if (artists) {
					content += '<ul id="search-results-artists">';
					for (i = 0; i < artists.length; i += 1) {
						link = 'onclick="wsl.load(\'?albums/' + artists[i].id + '\')"';
						claz = (i % 2 === 0 ? '' : 'odd');
						if (player.playing && player.playing.artist_id === artists[i].id) {
							claz += ' playing';
						}

						content += '<li id="artist-' + artists[i].id + '" class="' + claz + '">';
						content += '<span class="artist-name" ' + link + '>' + wsl.highlightSearch(artists[i].name, query) + '</li>';
					}
					content += '</ul>';
				}
				if (albums) {
					content += '<ul id="search-results-albums">';
					for (i = 0; i < albums.length; i += 1) {
						claz = 'selectable' + (i % 2 ? ' odd' : '');
						if (player.playing && player.playing.album_id === albums[i].id) {
							claz += ' playing';
						}
						content += '<li id="album-' + albums[i].id + '" class="' + claz + '">';

						cb = 'onmousedown="wsl.mouseDown(this,event);return false" ';
						content += '<span ' + cb + ' class="select-box">&nbsp</span>';
						content += '<span class="album-date">' + albums[i].date + '</span>';
						content += '<span onclick="wsl.load(\'?songs/' + albums[i].id + '\')"';
						content += 'class="album-name">' + wsl.highlightSearch(albums[i].name, query) + '</span>';
						content += '<span onclick="wsl.load(\'?albums/' + albums[i].artist + '\')"';
						content += 'class="album-artist-name">' + albums[i].artist_name + '</span>';
						content += '<span class="album-songs">' + albums[i].songs + ' songs</span>';
						content += '<span class="album-playtime">' + wsl.formatSeconds(albums[i].playtime) + '</span>';

						content += '</li>';
					}
					content += '</ul>';
				}
				if (songs) {
					content += '<ul id="search-results-songs">';
					for (i = 0; i < songs.length; i += 1) {
						claz = 'selectable' + (i % 2 ? ' odd' : '');
						if (player.playing && player.playing.song_id === songs[i].id) {
							claz += ' playing';
						}
						cb = 'onmousedown="wsl.mouseDown(this,event);return false" ';

						content += '<li id="song-' + songs[i].id + '" class="' + claz + '">';
						content += '<span ' + cb + ' class="select-box">&nbsp</span>';
						content += '<span onclick="wsl.playAlbum(' + songs[i].album_id + ',' + songs[i].id + ',' + songs[i].position + ')"" ';
						content += 'class="song-title">' + wsl.highlightSearch(songs[i].title, query) + '</span>';
						content += '<span onclick="wsl.load(\'?songs/' + songs[i].album_id + '\')" ';
						content += 'class="song-album">' + songs[i].album_name + '</span>';
						content += '<span onclick="wsl.load(\'?albums/' + songs[i].artist_id + '\')" ';
						content += 'class="song-artist">' + songs[i].artist_name + '</span>';
						content += '<span class="song-duration">' + wsl.formatSeconds(songs[i].duration) + '</span>';

						content += '</li>';
					}
					content += '</ul>';
				}
				content += '</div>';

				wsl.refreshNavbar({
					search : true
				});
				wsl.showContent({
					search : content
				});

				wsl.showSearchResult(wsl.searchTab);
				wsl.unlockUI();
			}