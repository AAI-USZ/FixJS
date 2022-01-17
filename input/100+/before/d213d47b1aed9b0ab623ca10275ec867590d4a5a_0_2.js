function showComments(event){
		var lineNumber = event.data;
		closeCommentBox();
		hideComments();
		discardMerge();
		var top_line = codeMirror.charCoords({line:lineNumber-1},"page").y;
		top_line -= $('#code').position().top;
		var set = $(".comment-set[lineNumber='"+lineNumber+"']");
		set.css('top',top_line);
		set.slideDown();
		var mirrors = commentMirrors[lineNumber];
		for(var index in mirrors){
			mirrors[index].refresh();
		}
	}