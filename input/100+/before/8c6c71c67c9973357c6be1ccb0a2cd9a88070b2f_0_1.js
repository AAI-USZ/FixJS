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
    }