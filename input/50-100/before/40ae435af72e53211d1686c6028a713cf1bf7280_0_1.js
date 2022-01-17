function buildCommentStructure(comments_ob) {
		var comments_list = comments_ob.comments;
		for(var index in comments_list) {
			var comment = comments_list[index];
			var line_start = comment.line_start;
			if(comments[line_start] === undefined)
				comments[line_start] = [];
			comments[line_start].push(comment);
		}
		for(var i in comments){
			buildCommentSet(Number(i)-1,comments[i]);
		}
	}