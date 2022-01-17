function(id) {
				cluster.workers[id].disconnect();
				pids.push(cluster.workers[id].process.pid);
			}