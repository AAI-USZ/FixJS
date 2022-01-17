function (uuid, video) {
		var obj = {
			'id': uuid,
			'name': video.name,
			'crtime': video.crtime,
			'uploaded': video.uploaded,
			'mtime': video.lastUpdated,
			'races': video.races,
			'metadata': video.metadata,
			'error': video.error,
			'stderr': video.stderr,
			'frameImages': video.pngDir ? true : false
		};

		if (video.error) {
			obj.state = 'error';
		} else if (!video.saved) {
			obj.state = 'uploading';
		} else if (!video.processed && !video.child) {
			obj.state = 'waiting';
		} else if (!video.processed) {
			obj.state = 'reading';
			obj['frame'] = video.frame || 0;
			obj['nframes'] = video.maxframes || video.frame || 100;
		} else if (!video.metadata) {
			obj.state = 'unconfirmed';
		} else {
			obj.state = 'done';
		}

		rv.push(obj);
	}