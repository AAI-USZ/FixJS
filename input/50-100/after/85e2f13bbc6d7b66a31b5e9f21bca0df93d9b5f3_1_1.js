function(data){

	    		var item=data.returnData;
	    		iGuess.model.setRoomId(item.rid);
	    		var url = 'http://' + location.hostname + location.pathname;
	    		$('#urlInput')[0].value=url + '?rid='+item.rid;

	    	}