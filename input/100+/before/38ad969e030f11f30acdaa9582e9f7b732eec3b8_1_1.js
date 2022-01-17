function(worker) {
            // Make sure not to keep restarting workers while exiting
            if (exiting) { return; }
            console.log('worker ' + worker.pid + ' died');
            delete workers[worker.pid];
            var new_worker = cluster.fork();
            workers[new_worker.pid] = new_worker;
        }