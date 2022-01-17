function(e){
		var curr_msg = $("#msgout").val();
		if(find_nick.test(curr_msg)) curr_msg = curr_msg.replace(find_nick,'');
		$("#msgout").val("["+$.trim($(this).text())+"]," + curr_msg);
	}