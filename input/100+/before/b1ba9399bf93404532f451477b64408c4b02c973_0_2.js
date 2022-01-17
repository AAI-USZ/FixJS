function showCommentBox(start,end) {
		selection_start = start;
		selection_end = end;
		$('input#line-start').val(start);
		$('input#line-end').val(end);
		$('#line-start-num').text(start);
		$('#line-end-num').text(end);
		diffMirror.setOption("firstLineNumber",start);
		diffMirror.setValue(codeMirror.getRange(
			{line:start-1,ch:0},
			{line:end-1,ch:999999}));
		var comment_box = $('#comment-new');
		var coords = codeMirror.charCoords({line:start-1,char:0});
		comment_box.css('top',coords.y);
		comment_box.slideDown();
	}