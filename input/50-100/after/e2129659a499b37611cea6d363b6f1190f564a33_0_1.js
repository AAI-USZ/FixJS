function(error, job_in_progress) {
				if (error) {
					console.log(util.inspect(error));
					return;
				}
								
				if (job_in_progress) {
					self._status = "processing";
					self._processing = job_in_progress;
					self._heartbeats = 0;
					job_in_progress.o && self._broadcast(job_in_progress.o, {"command": "processJob", "params": job_in_progress});
				}

				printHeartbeat();
			}