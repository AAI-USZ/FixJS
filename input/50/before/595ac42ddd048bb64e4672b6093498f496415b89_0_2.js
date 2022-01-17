function(id) {
				cluster.workers[id].disconnect();
				killWorker(cluster.workers[id].process.pid, 0, 'SIGTERM');
			}