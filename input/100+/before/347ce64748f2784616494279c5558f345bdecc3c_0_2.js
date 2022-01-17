function showComments(codeMirror, lineNumber){
		closeCommentBox();
		hideComments();
		var top_line = codeMirror.charCoords({line:lineNumber,char:0},"page").y;
		top_line -= $('#code').position().top;
		var set = $(".comment-set[lineNumber='"+lineNumber+"']");
		set.css('top',top_line);
		set.slideDown();
		var mirrors = commentMirrors[lineNumber];
		for(var index in mirrors){
			mirrors[index].refresh();
		}
	}