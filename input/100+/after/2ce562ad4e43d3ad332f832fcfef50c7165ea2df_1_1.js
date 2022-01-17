function (arg) {
		var navbar = '', clazz, cb, name;

		clazz = 'navbar-playing';
		cb = 'wsl.load(\'?playing/\')';
		navbar += '<a id="navbar-playing" class="' + clazz + '" onclick="' + cb + '">Playing</a>';

		clazz = 'navbar-random';
		navbar += '<a class="' + clazz + '" onclick="wsl.load(\'?random\')">Random</a>';

		navbar += '<hr/>';

		clazz = (arg.home ? 'selected-nav ' : '') + 'navbar-home';
		navbar += '<a class="' + clazz + '" onclick="wsl.load(\'?\')">Home</a>';

		if (arg.search) {
			clazz = 'navbar-search indent selected-nav';
			navbar += '<a class="' + clazz + '">Search</a>';
			navbar += '<div class="context-action">';
			navbar += "<a class='navbar-select-all context-action' onclick='wsl.selectAll()' title='Select all albums'></a>";
			navbar += "<a class='navbar-cancel-select context-action selection-disabled' onclick='wsl.clearSelection()' title='Cancel selection'></a>";
			navbar += "<a class='navbar-add-songs context-action selection-disabled' onclick='wsl.showAddToPlaylist()' title='Add selected songs to playlist'></a>";
			navbar += "<a class='navbar-play context-action selection-disabled' onclick='wsl.playNow()' title='Play now'></a>";
			navbar += '</div>';

		}

		clazz = (arg.artists ? 'selected-nav ' : '') + 'navbar-artists';
		navbar += '<a class="' + clazz + '" onclick="wsl.load(\'?artists/\')">Library</a>';

		if (arg.artist) {
			clazz = 'navbar-artist indent' + (arg.album ? '' : ' selected-nav');
			name = arg.artist.name;
			if (name === '') {
				name = 'no metadata';
				clazz += ' navbar-no-metadata';
			}
			navbar += '<a class="' + clazz + '" onclick="wsl.load(\'?albums/' + arg.artist.id + '\')">';
			navbar += name + "</a>";
			if (!arg.album) {
				navbar += "<div class='context-action'>";
				navbar += "<a class='navbar-select-all context-action' onclick='wsl.selectAll()' title='Select all albums'></a>";
				navbar += "<a class='navbar-cancel-select context-action selection-disabled' onclick='wsl.clearSelection()' title='Cancel selection'></a>";
				navbar += "<a class='navbar-add-songs context-action selection-disabled' onclick='wsl.showAddToPlaylist()' title='Add selected songs to playlist'></a>";
				navbar += "<a class='navbar-play context-action selection-disabled' onclick='wsl.playNow()' title='Play now'></a>";
				navbar += "</div>";
			}
		}

		if (arg.album) {
			clazz = 'navbar-album indent selected-nav';
			name = arg.album.name;
			if (name === '') {
				name = 'no metadata';
				clazz += ' navbar-no-metadata';
			}
			navbar += '<a class="' + clazz + '" onclick="wsl.load(\'?songs/' + arg.album.id + '\')">';
			navbar += name + "</a>";
			navbar += "<div class='context-action'>";
			navbar += "<a class='navbar-select-all context-action' onclick='wsl.selectAll()' title='Select all songs'></a>";
			navbar += "<a class='navbar-cancel-select context-action selection-disabled' onclick='wsl.clearSelection()' title='Cancel selection'></a>";
			navbar += "<a class='navbar-add-songs context-action selection-disabled' onclick='wsl.showAddToPlaylist()' title='Add selected songs to playlist'></a>";
			navbar += "<a class='navbar-play context-action selection-disabled' onclick='wsl.playNow()' title='Play now'></a>";
			navbar += "</div>";
		}

		clazz = (arg.playlists ? 'selected-nav ' : '') + 'navbar-playlists';
		navbar += '<a class="' + clazz + '" onclick="wsl.load(\'?playlists/\')">Playlists</a>';
		if (arg.playlists) {
			navbar += '<div class="context-action">';
			navbar += '<a class="navbar-new-playlist" onclick="wsl.showCreatePlaylist()" title="Create a new playlist"></a>';
			navbar += "<a class='selection-disabled navbar-delete-playlist' onclick='wsl.deletePlaylist()' title='Delete selected playlists'></a>";
			navbar += "</div>";
		}

		if (arg.playlist) {
			clazz = 'navbar-playlist indent selected-nav';
			navbar += '<a class="' + clazz + '" onclick="wsl.load(\'?playlist/' + arg.playlist.id + '\')">';
			navbar += arg.playlist.name + "</a>";

			navbar += "<div class='context-action'>";
			cb = "onclick='wsl.deleteSelectedSongs(" + arg.playlist.id + ")'";
			navbar += "<a class='navbar-select-all context-action' onclick='wsl.selectAll()' title='Select all songs'></a>";
			navbar += "<a class='navbar-cancel-select context-action selection-disabled' onclick='wsl.clearSelection()' title='Cancel selection'></a>";
			navbar += "<a class='selection-disabled context-action navbar-delete-songs-playlist' " + cb + " title='Remove selected songs from playlist'></a>";
			navbar += "</div>";
		}

		navbar += "<hr/>";

		clazz = 'navbar-users';
		if (arg.users) {
			clazz += ' selected-nav';
		}
		navbar += '<a class="' + clazz + '" onclick="wsl.load(\'?users/\')">Users</a>';

		if (arg.user) {
			clazz = 'navbar-user indent selected-nav';
			name = arg.user.name;
			navbar += '<a class="' + clazz + '" onclick="wsl.load(\'?user/' + arg.user.id + '\')">';
			navbar += name + "</a>";
		}

		clazz = 'navbar-settings';
		if (arg.settings) {
			clazz += ' selected-nav';
		}
		navbar += '<a class="' + clazz + '" onclick="wsl.load(\'?settings\')">Settings</a>';
		if (wsl.admin) {
			clazz = 'navbar-admin';
			if (arg.admin) {
				clazz += ' selected-nav';
			}
			navbar += '<a class="' + clazz + '" onclick="wsl.load(\'?admin\')">Admin</a>';
		}

		navbar += "<hr/>";

		clazz = 'navbar-about';
		if (arg.about) {
			clazz += ' selected-nav';
		}
		navbar += '<a class="' + clazz + '" onclick="wsl.load(\'?about\')">About</a>';

		navbar += "<a class='navbar-logout' onclick='wsl.logout()'>Logout</a>";

		$("#navbar").empty().append(navbar);
	}