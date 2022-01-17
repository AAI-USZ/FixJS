function(data){

	    		var item=data.returnData;
	    		iGuess.model.setRoomId(item.rid);
	    		var url = location.origin + location.pathname;
	    		$('#urlInput')[0].value=url + '?rid='+item.rid;

	    	}