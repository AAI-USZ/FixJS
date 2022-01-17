function handleSelection( ){
		if(!noSelect){
			if(codeMirror.somethingSelected){
				var start = codeMirror.getCursor(true).line + 1;
				var end = codeMirror.getCursor(false).line + 1;
				codeMirror.markText( 
									{ line: start, ch: 0 }, 
									{ line: end, ch: 0 }, 
									'line-of-code' );
				hideComments();
				showCommentBox( start, end );
			}else{
				hideCommentBox();
			}
		}
	}