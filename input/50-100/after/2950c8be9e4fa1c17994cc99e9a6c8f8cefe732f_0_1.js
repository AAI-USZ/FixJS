function toggleAnonymous(e){
	if(e){
		$('#comment-username').text("Anónimo");
		$('#comment-programName').text("...");
		$('#new-comment-photo>img').attr('src',anonymousImagePath);
	}else{
		$('#comment-username').text(userName);
		$('#comment-programName').text(userProgram);
		$('#new-comment-photo>img').attr('src',userImagePath);

	}	
}