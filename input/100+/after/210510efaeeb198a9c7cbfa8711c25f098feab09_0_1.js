function handleSelection(){
		if(!noSelect){
			if(somethingSelected(codeArea)){
				var lines = getSelectedLines(codeArea);
				
				var top = getPositionOfLine(codeArea,lines.start);
				
				$('#comment-new').css("top", top);
				hideComments();
				showCommentBox(lines.start+1,lines.end+1);
			}else{
				closeCommentBox();
			}
		}
	}