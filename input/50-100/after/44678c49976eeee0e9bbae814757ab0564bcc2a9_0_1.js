function showComments(codeMirror, lineNumber){
		closeCommentBox();
		hideComments();
		$(".commentSet[lineNumber='"+lineNumber+"']").slideDown();
		var mirrors = commentMirrors[lineNumber];
		for(var index in mirrors){
			mirrors[index].refresh();
		}
	}