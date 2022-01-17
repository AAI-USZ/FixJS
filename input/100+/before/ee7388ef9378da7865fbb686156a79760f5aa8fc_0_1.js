function buildCommentSet(lineNumber,commentSet) {
		if(codeArea == null) {
			logError('Tried to build comment set while codeArea null');
			return;
		}
		commentAreas[lineNumber] = [];
		
		var commentInfo = $("#comment-info");
		var commentInfoBtn =  $("<button class='commentButton'>");
		commentInfoBtn.text(commentSet.length+" comments");
		commentInfoBtn.css("position","absolute");
		var top = getPositionOfLine(codeArea,lineNumber-1);
		
		commentInfoBtn.css("top",top);
		commentInfoBtn.click(lineNumber,showComments);
		commentInfoBtn.attr("lineNumber",lineNumber-1);
		commentInfo.append(commentInfoBtn);
		
		var set = $("<div class='comment-set'>");
		set.attr("lineNumber",lineNumber);
		var rawDiffsList = {};
		for(var i=0;i<commentSet.length;i++){
			var comment = commentSet[i];
			var commentDiv = $("<div class='comment-box'>");
			commentDiv.mouseover({startLine:comment.line_start, 
				endLine:comment.line_end},setSelection);
			commentDiv.mouseout(clearCodeSelection);
			var title = $("<div class='comment-title'>");
			title.text(comment.user);
			var body = $("<div class='comment-body'>");
			body.text(comment.text);
			
			commentDiv.append(title);
			commentDiv.append(body);
			
			set.append(commentDiv);
			
			if(comment.diffs){
				var diffs = $("<textarea class='comment-diffs'>");
				var range = getRangeOfLines(comment.line_start-1,
					comment.line_end-1);
				var original = getTextOnLines(codeArea,
					comment.line_start, comment.line_end);
				var diffString = comment.diffs;
				var diffString = diffString.replace(/\r/gm,'');
				if(original != diffString){
					
					var rawDiffs = diffComputer.diff_main(original,diffString);
					diffComputer.diff_cleanupSemantic(rawDiffs);
					rawDiffs.from = range.from;
					rawDiffs.to = range.to;
					var str = "";
					var hasDiffs = false;
					for(var index = 0; index<rawDiffs.length; index++){
						var diff = rawDiffs[index];
						str+=diff[1];
						hasDiffs = hasDiffs || diff[0];
					}
					rawDiffsList[i]=rawDiffs;
					commentDiv.append(diffs);
					diffs.text(str);
				
					var area = createArea(diffs.get(0),commentOptions);
				
					var curIndex = 0;
					var curPos = getPosFromIndex(area,curIndex);
					for(var index = 0; index<rawDiffs.length; index++){
						var diff = rawDiffs[index];
						var type = diff[0];
						var text = diff[1];
						var newIndex = curIndex+text.length;
						var newPos = getPosFromIndex(area,newIndex);
						styleText(area,curPos,newPos,"diffStyle_"+type);
						curIndex = newIndex;
						curPos = newPos;
					}
					setFirstLineNumber(area,lineNumber);
					commentAreas[lineNumber].push(area);
					var useIt = $("<input type='checkbox'>");
					useIt.attr("value",i);
					useIt.click(function(){
						var diffNum = $(this).attr("value");
						if($(this).is(":checked")){
							appliedDiffs.push(rawDiffsList[diffNum]);	
						}else{
							appliedDiffs.splice(
								appliedDiffs.indexOf(rawDiffsList[diffNum]),1);
						}
					})
					commentDiv.append($("<label>Use this diff &nbsp;</label>"));
					commentDiv.append(useIt);
				}
			}
			
		}

		$("#comment-view").append(set);
		set.hide();
	}