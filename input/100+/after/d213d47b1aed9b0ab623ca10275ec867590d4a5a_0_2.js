function(){
			var mirrors = commentMirrors[lineNumber];
			for(var index in mirrors){
				mirrors[index].refresh();
			}
		}