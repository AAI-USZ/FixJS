function(response){
		bbs_post_info.quote = JSON.parse(response);
		callback_func();
	}