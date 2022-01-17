function handleSelection( ){
		if(!noSelect){
			if( codeMirror.somethingSelected ){
				var start = codeMirror.getCursor(true).line;
				var end = codeMirror.getCursor(false).line;

				// Adds the class to the new text
				var top_line = codeMirror.charCoords({line:start,ch:0},"page").y;
				top_line -= $('#code').position().top;
				console.log(top_line);
				$('#comment-new').css( 'top', top_line );
				
				hideComments();
				showCommentBox( start+1 , end+1 );
			}else{
				hideCommentBox();
			}
		}
	}