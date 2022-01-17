function handleSelection(){
		if(!noSelect){
			if(somethingSelected(codeArea)){
				var lines = getSelectedLines(codeArea);
				
				var top = getPositionOfLine(codeArea,lines.start);
				
				$('#comment-new').css("top", top);
				console.log(top,$('#comment-new').css("top"),$('#comment-new').css("position"));
				hideComments();
				showCommentBox(lines.start+1,lines.end+1);
			}else{
				closeCommentBox();
			}
		}
	}