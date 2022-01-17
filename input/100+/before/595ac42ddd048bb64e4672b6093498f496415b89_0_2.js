function() {
			shuttingDown = true;
			var pids = [];
			Object.keys(cluster.workers).forEach(function(id) {
				pids.push(cluster.workers[id]);
			});
			/* Don't work well on Ubuntu/Node v0.8.1
			cluster.disconnect(function() {
				console.log('Finishing disconnect');
				var fd = fs.openSync(PID_FILE, 'w+');
				fs.writeSync(fd, "");
				fs.close(fd);
				process.exit(0);
			});
			*/
			pids.forEach(function(pid) {
				killWorker(pid, 0, 'SIGTERM');
				var fd = fs.openSync(PID_FILE, 'w+');
				fs.writeSync(fd, "");
				fs.close(fd);
				process.exit(0);
			});
		}