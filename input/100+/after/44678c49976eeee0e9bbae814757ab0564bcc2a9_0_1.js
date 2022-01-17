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
				var from = {line:comment.line_start-1,ch:0};
				var to = {line:comment.line_end-1,ch:999999};
				var original = codeMirror.getRange(from,to);
				var rawDiffs = diffComputer.diff_main(original,comment.diffs);
				diffComputer.diff_cleanupSemantic(rawDiffs);
				rawDiffs.from = from;
				rawDiffs.to = to;
				var str = "";
				var hasDiffs = false;
				for(var index = 0; index<rawDiffs.length; index++){
					var diff = rawDiffs[index];
					str+=diff[1];
					hasDiffs = hasDiffs || diff[0];
				}
				if(hasDiffs){
					commentDiv.append(diffs);
					diffs.text(str);
				
					var mirror = CodeMirror.fromTextArea(
						diffs.get(0),commentOptions);
				
					var curIndex = 0;
					var curPos = mirror.posFromIndex(curIndex);
					for(var index = 0; index<rawDiffs.length; index++){
						var diff = rawDiffs[index];
						var type = diff[0];
						var text = diff[1];
						var newIndex = curIndex+text.length;
						var newPos = mirror.posFromIndex(newIndex);
						if(newPos.ch==0){
							newPos.line--;
							newPos.ch=999999;
						}
						mirror.markText(curPos,newPos,"diffStyle_"+type);
						curIndex = newIndex;
						curPos = newPos;
					}
					
					mirror.setOption("firstLineNumber",lineNumber+1);
					commentMirrors[lineNumber].push(mirror);
					var useIt = $("<input type='checkbox'>");
					useIt.click(function(){
						if($(this).is(":checked")){
							appliedDiffs.push(rawDiffs);	
						}else{
							appliedDiffs.splice(
								appliedDiffs.indexOf(rawDiffs),1);
						}
					})
					commentDiv.append($("<label>Use this diff</label>"));
					commentDiv.append(useIt);
				}
			}
			
		}

		$("#commentsDiv").append(set);
		set.hide();
	}