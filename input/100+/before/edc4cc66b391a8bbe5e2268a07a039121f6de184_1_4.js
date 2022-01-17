function(suffix, id) {
		var track, that = this,
			tl = this.tl,
			serializer, mime;
		suffix = suffix.toUpperCase();
		
		serializer = "to"+suffix;
		mime = {SRT:"text/srt",VTT:"text/vtt"}[suffix];
		if(!mime){ throw new Error("Unsupported file type."); }
			
		sendParts.call(this,
			(track = tl.getTrack(id))?
			[buildPart.call(this,addSuffix(track.id,suffix),track[serializer](),mime)]: //save a single track
			tl.tracks.map(function(track){	//save all the tracks
				return buildPart.call(that,addSuffix(track.id,suffix),track[serializer](),mime);
			})
		);
	}