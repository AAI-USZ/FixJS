function(err, response) {
    	tick();
    	var data = [];
        if(err) throw err;
        response.forEach(function(board) {
        	data.push({ board_name : board.name, board_id: board.id})
        });
        callback(null, data);
    }