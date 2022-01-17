function(w, cb){
					//console.log('fsyncing fd: ' + fd)
					fs.fsync(fd, function(err){
						if(err) throw err;

						writtenSinceLastSync = w
						//console.log('cbing sync')
						cb()
					})
				}