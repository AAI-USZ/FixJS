function showComments(codeMirror, lineNumber){
		closeCommentBox();
		hideComments();
		$(".comment-set[lineNumber='"+lineNumber+"']").slideDown();
		var mirrors = commentMirrors[lineNumber];
		for(var index in mirrors){
			mirrors[index].refresh();
		}
	}