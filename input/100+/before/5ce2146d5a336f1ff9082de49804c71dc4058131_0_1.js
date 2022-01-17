function () {
			var i, content;

			if (!users || !folders) {
				return;
			}

			content = '<h3>Music folders</h3>';
			if (folders.length > 0) {
				content += '<ul id="admin-music-folders">';
				for (i = 0; i < folders.length; i += 1) {
					content += '<li class="selectable">';
					content += '<span onclick="wsl.toggleSelection(this.parentNode)" ';
					content += 'class="select-box">&nbsp</span>';
					content += '<span class="admin-music-folder-directory">' + folders[i] + '</span>';
					content += '</li>';
				}
				content += '</ul>';
			} else {
				content += '<p>No music folders!</p>';
			}
			content += '<div><span class="button button-add" onclick="wsl.showAddMusicFolder()">Add</span>';
			content += '<span class="button button-cancel" onclick="wsl.removeMusicFolder()">Remove</span><div>';

			content += '<p id="admin-indexer-status">&nbsp;</p>';

			if (!wsl.indexerStatusInterval) {
				wsl.indexerStatusInterval = window.setInterval(function () {
					$.ajax({
						url : 'wissl/indexer/status',
						headers : {
							sessionId : wsl.sessionId
						},
						dataType : 'json',
						success : function (data) {
							var c = '';
							if (data.running) {
								c += 'Indexer running: ' + (data.percentDone * 100).toFixed(2) + '%';
								c += ' (' + data.songsDone + '/' + data.songsTodo + ')';
								c += ', ' + wsl.formatSeconds(data.secondsLeft, true) + ' left';
							} else {
								c += 'Indexer is not running';
								window.clearInterval(wsl.indexerStatusInterval);
								wsl.indexerStatusInterval = null;
							}
							$('#admin-indexer-status').empty().html(c);
						},
						error : function (xhr, textStatus, errorThrown) {
							wsl.ajaxError("Failed to get indexer status", xhr);
							wsl.unlockUI();
						}
					});
				}, 1000);
			}

			content += '<h3>Users</h3>';
			content += '<ul id="admin-users-list">';
			for (i = 0; i < users.length; i += 1) {
				content += '<li class="selectable">';
				content += '<span onclick="wsl.toggleSelection(this.parentNode)" ';
				content += 'class="select-box">&nbsp</span>';
				content += '<span class="users-admin-id">' + users[i].id + '</span>';
				content += '<span>' + users[i].username + '</span>';
				if (users[i].auth === 1) {
					content += '<span class="users-admin">admin</span>';
				}
				content += '</li>';
			}
			content += '</ul>';
			content += '<div><span class="button button-add" onclick="wsl.showAddUser()">Add</span>';
			content += '<span class="button button-cancel" onclick="wsl.removeUser()">Remove</span><div>';

			content += '<h3>Other</h3>';
			cb = 'window.open(\'/wissl/logs?&sessionId=' + wsl.sessionId + '\',\'_blank\')';
			content += '<p><span class="button button-logs" onclick="' + cb + '">Server logs</span></p>';
			content += '<p><span class="button button-shutdown" onclick="wsl.shutdown()">Shutdown server</p>';

			wsl.showContent({
				admin : content,
				scroll : scroll
			});
			wsl.refreshNavbar({
				admin : true
			});
			wsl.unlockUI();
		}