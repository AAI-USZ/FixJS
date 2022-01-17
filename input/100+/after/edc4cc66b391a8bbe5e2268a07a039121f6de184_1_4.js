function(type, id) {
		var track, that = this,
			tl = this.tl,
			serializer = "to"+type.toUpperCase(),
			suffix = type.toLowerCase(),
			mime = {srt:"text/srt",vtt:"text/vtt"}[suffix];
			
		if(!mime){ throw new Error("Unsupported file type."); }
			
		sendParts.call(this,
			(track = tl.getTrack(id))?
			[buildPart.call(this,addSuffix(track.id,suffix),track[serializer](),mime)]: //save a single track
			tl.tracks.map(function(track){	//save all the tracks
				return buildPart.call(that,addSuffix(track.id,suffix),track[serializer](),mime);
			})
		);
	}