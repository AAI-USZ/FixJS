function merge(){
		if(!mergeMirror){
			var area = $("<textarea>");
			$("#code").append(area);
			mergeMirror = CodeMirror.fromTextArea(area.get(0),codeOptions);
		}
		mergeMirror.setValue(codeMirror.getValue());
		appliedDiffs.sort(function(a,b){
			return b.from.line-a.from.line;
		});
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
			mergeMirror.replaceRange(result,diffSet.from,diffSet.to);
		}
		mergeMirror.refresh();
	}