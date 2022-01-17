function(err, rhistory){
		    //socket.broadcast(rhistory);
		    //console.log(rhistory);
		    //history = JSON.parse(rhistory);
		    rhistory.forEach(function(message, i){
				io.sockets.emit('broadcast', JSON.parse(message));
		    })

	    }