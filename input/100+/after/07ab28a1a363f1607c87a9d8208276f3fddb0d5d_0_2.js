function showCommentBox(start,end) {
		console.log(start,end);
		selection_start = start;
		selection_end = end;
		$('input#line-start').val(start);
		$('input#line-end').val(end);
		$('#line-start-num').text(start);
		$('#line-end-num').text(end);
		diffMirror.setOption("firstLineNumber",start);
		var text = codeMirror.getRange(
			{line:start-1,ch:0},
			{line:end-1,ch:999999});
		console.log(text);
		diffMirror.setValue(text);
		diffMirror.refresh();
		$('#comment-new').slideDown();
	}