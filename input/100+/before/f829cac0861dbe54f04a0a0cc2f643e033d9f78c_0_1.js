function(content){
			var i,glosses=content.glossedWords,
				ann_types={'textAnnotation':true,'imageAnnotation':true,'audioAnnotation':true,'videoAnnotation':true};
				
			i=Languages.list.length-1;
			while(i>-1 && content.contentLanguage !== Languages.list[i][0]){i--;}
			scMain.cLangBox.selectedIndex = i;
			
			i=Languages.list.length-1;
			while(i>-1 && content.translationLanguage !== Languages.list[i][0]){i--;}
			scMain.tLangBox.selectedIndex = i;
			
			scMain.displayGlossList();
			scAnn.updateGlossLib();
			
			function JSONglosses(){
				var obj = {word:this.word},i;
				for(i in ann_types){
					if(this.hasOwnProperty(i) && this[i].length){
						obj[i]=this[i];
					}
				}
				return obj;
			}
			for(i=glosses.length-1;i>=0;i--){glosses[i].toJSON = JSONglosses;}
			TIARA.JSONglosses = JSONglosses;
		}