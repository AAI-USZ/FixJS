function (error, stdout, stderr) {
				var output = '';				
				
				if (stderr !== '') {
					output = output+'\n'+stderr;
				} else {
          output = stdout;
				}
				
	    		console.log('stdout: <'+output+'>');
	    		socket.emit('out', {'text': output});
	    		if (error !== null) {
	    			console.log(stderr);
//	    			socket.emit('out', {'text': stderr});
	    		}	    		
	  		}