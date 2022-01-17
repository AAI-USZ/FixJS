function(content){
			var i;
				
			content.glossedWords.forEach(function(gloss){ gloss.toJSON = JSONglosses; });
			
			i=Languages.list.length-1;
			while(i>-1 && content.contentLanguage !== Languages.list[i][0]){i--;}
			scMain.cLangBox.selectedIndex = i;
			
			i=Languages.list.length-1;
			while(i>-1 && content.translationLanguage !== Languages.list[i][0]){i--;}
			scMain.tLangBox.selectedIndex = i;
			
			scMain.displayGlossList();
			scAnn.updateGlossLib();
		}