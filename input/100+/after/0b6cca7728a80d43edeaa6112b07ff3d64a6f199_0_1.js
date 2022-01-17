function computeMerge(){
		if(!mergeArea){
			var area = $("<textarea>");
			$("#merge-output").append(area);
			mergeArea = createArea(area.get(0),codeOptions);
		}
		setText(mergeArea,getText(codeArea));
		appliedDiffs.sort(comparePositions);
		for(var i in appliedDiffs){
			var diffSet = appliedDiffs[i];
			var result = "";
			for(var j=0; j<diffSet.length; j++){
				var diff = diffSet[j];
				var type = diff[0];
				var text = diff[1];
				if(type!=-1){
					result+=text;
				}
			}
			setTextOnRange(mergeArea,diffSet.range,result);
		}
		reRender(mergeArea);
		hideComments();
		closeCommentBox();
	}