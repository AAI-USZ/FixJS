function(r, msq) {
		var music_list = [];
		for (var i=1, l = r.length; i < l; i++) {
			var entity = this.makeVKSong(r[i], msq);
			
			if (entity){
				if (entity.query_match_index == -1){
					console.log(entity)
				} else if (!entity.link.match(/audio\/.mp3$/) && !has_music_copy( music_list, entity)){
					music_list.push(entity)
				}
			}
		}
		if (music_list.length){
			sortMusicFilesArray(music_list);
		}
		
		return music_list;
	}