function buildCommentSet(lineNumber,commentSet) {
		if(codeMirror == null) {
			logError('Tried to build comment set while code mirror null');
			return;
		}
		commentMirrors[lineNumber] = [];
		codeMirror.setMarker(lineNumber,
							 "<span class='commentNumber'>("+
							 commentSet.length+")</span> %N%");
		var set = $("<div class='commentSet'>");
		var coords = codeMirror.charCoords({line:lineNumber,char:0});
		//console.log('coords');
		//console.dir(coords);
		set.css('top',coords.y);
		set.attr("lineNumber",lineNumber);
		for(var i=0;i<commentSet.length;i++){
			var comment = commentSet[i];
			var commentDiv = $("<div class='commentBox'>");
			commentDiv.mouseover({startLine:comment.line_start,endLine:comment.line_end},setSelection);
			var title = $("<div class='commentTitle'>");
			title.text(comment.user);
			var body = $("<div class='commentBody'>");
			body.text(comment.text);
			
			commentDiv.append(title);
			commentDiv.append(body);
			
			set.append(commentDiv);
			
			if(comment.diffs){
				var diffs = $("<textarea class='commentDiffs'>");
				commentDiv.append(diffs);
				var original = codeMirror.getRange(
					{line:comment.line_start-1,ch:0},
					{line:comment.line_end,ch:0});
				var rawDiffs = diffComputer.diff_main(original,comment.diffs);
				diffComputer.diff_cleanupSemantic(rawDiffs);
				
				var str = "";
				for(index in rawDiffs){
					str+=rawDiffs[index][1];
				}
				diffs.text(str);
				
				var mirror = CodeMirror.fromTextArea(diffs.get(0),commentOptions);
				
				var curIndex = 0;
				var curPos = mirror.posFromIndex(curIndex);
				for(index in rawDiffs){
					var diff = rawDiffs[index];
					var type = diff[0];
					var text = diff[1];
					
					var newIndex = curIndex+text.length;
					var newPos = mirror.posFromIndex(newIndex);
					mirror.markText(curPos,newPos,"diffStyle_"+type);
					curIndex = newIndex;
					curPos = newPos;
				}
				
				mirror.setOption("firstLineNumber",lineNumber+1);
				commentMirrors[lineNumber].push(mirror);
			}
			
		}

		$("#commentsDiv").append(set);
		set.hide();
	}