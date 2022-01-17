function(err) {
        if ( err ) {
            console.log("background worker: got an error on previous job: ",err);
        }
		if ( messageQueue.length ) {
			var job = messageQueue.splice(0,1)[0];
			if ( ! job.type in jobs ) {
				console.log("background worker: unknown job ",job);
				return next();
			}
				console.log("background worker: launching ",job);
			jobs[job.type](next);
		}
	}