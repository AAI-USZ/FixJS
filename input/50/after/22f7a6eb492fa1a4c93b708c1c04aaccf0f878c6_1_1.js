function(response){
		$('#editcont' + postid).raw().innerHTML = response;   
		resize('editbox' + postid);
	}