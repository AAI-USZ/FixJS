function (data) {
    	var status;
    	if(data.paused) {
    		status = 'Paused';
    	} else if (data.song == undefined) {
    		status = 'Stopped';
    	} else {
    		status = 'Playing';
    	}
    	console.log('Status: ' + status);
    	// Now update the now playing div
    	$("#nowPlaying").empty();
    	var items = [];
    	items.push('<p>Status: ' + status + '</p>');
    	if(data.song != undefined) {
    		items.push('<p>' + data.song.artist_name + ' - ' + data.song.name + '  <a href=\'#\' onclick="return addSongToQueue(\'' + data.song.id + '\')">Requeue</a></p>');
    	}
        $('#nowPlaying').append(items.join(''));
        //
        var image = (!data.song.album_art_sml) ? '/images/album.png' : data.song.album_art_sml;
        $.gritter.add({
                title: 'Now Playing',
                text: data.song.artist_name + ' - ' + data.song.name,
                image: image,
                sticky: false,
                time: ''
            });
    }