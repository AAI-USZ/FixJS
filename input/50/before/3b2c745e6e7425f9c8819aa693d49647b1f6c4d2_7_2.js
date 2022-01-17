function(){

    	var playlistName = _addInput.val();

        //Only add the playlist if a name was provided.

        if( playlistName.trim() != ''){

            Player.addPlaylist(playlistName);

            playlistHeader.flashMessage('Thanks!', 2000);

        }

    }