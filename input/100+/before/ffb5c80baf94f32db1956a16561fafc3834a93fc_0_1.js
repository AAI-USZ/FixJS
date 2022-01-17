function(data){
    	if (data.letter) {
	    	console.log('execute <'+data.letter+'>');
			exec(data.letter, function (error, stdout, stderr) {
				var output = stdout;
				
				if (stderr !== '') {
					output = output+'\n'+stderr;
				}
				
	    		console.log('stdout: <'+output+'>');
	    		socket.emit('out', {'text': output});
	    		if (error !== null) {
	    			console.log(stderr);
//	    			socket.emit('out', {'text': stderr});
	    		}	    		
	  		});	    	       				
    	}
    }