function(){

		//Any objects returned from localStorage will only have properties and not their methods.

		var playlistsWithoutMethods = localStorage.getItem('playlists');



		try {

			if (playlistsWithoutMethods && playlistsWithoutMethods != 'undefined')

	            playlistsWithoutMethods = JSON.parse(playlistsWithoutMethods);

		}

		catch(exception){

			console.error(exception);

		}



		//Playlists were loaded. Need to reconstruct them as serialization strips off methods.

		if(playlistsWithoutMethods && playlistsWithoutMethods.length > 0){

			$(playlistsWithoutMethods).each(function(){

				var playlist = new Playlist(this.id, this.title);

				_playlists.push(playlist);

			})

		}

		else{

			var defaultPlaylist = new Playlist(null, null);

			_playlists.push(defaultPlaylist);

		}

		

		_save()

	}