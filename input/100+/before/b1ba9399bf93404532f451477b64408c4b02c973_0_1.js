function getSelection(codeMirror){
		if(!noSelect){
			if(codeMirror.somethingSelected){
				var start = codeMirror.getCursor(true).line + 1;
				var end = codeMirror.getCursor(false).line + 1;
				hideComments();
				showCommentBox(start,end);
			}else{
				hideCommentBox();
			}
		}
	}