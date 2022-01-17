function(response){
		$('#editcont' + postid).raw().innerHTML = response;   
		resize('editcont' + postid);
	}