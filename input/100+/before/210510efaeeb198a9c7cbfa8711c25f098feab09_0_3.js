function showComments(event){
		var lineNumber = event.data;
		closeCommentBox();
		hideComments();
		discardMerge();
		var top = getPositionOfLine(codeArea,lineNumber-1);
		var set = $(".comment-set[lineNumber='"+lineNumber+"']");
		console.log(top,$(event.target).css("top"));
		set.css('top',$(event.target).css("top"));
		set.slideDown(400,function(){
			var areas = commentAreas[lineNumber];
			for(var index in areas){
				reRender(areas[index]);
			}
		});
	}