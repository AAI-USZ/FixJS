function updateGlosses(word){
		"use strict";
		word = $.trim(word);
		if(!word){return;}
		var x,i,marker,page,newgloss,
			normgloss = word.toLowerCase();
		make_new: {
			for(i=editGlosses.length-1;i>=0;i--){
				if(normgloss===editGlosses[i].word.toLowerCase()){
					//populate form elements
					thisObj.updateGlossLib();
					x=glossLib.options.length-1;
					while(x>=0&&glossLib.options[x].value.toLowerCase()!==normgloss){x--;}
					glossLib.selectedIndex=x;
					thisObj.loadGloss(word);
					break make_new;
				}
			}
			newgloss = {
				word:word,
				textAnnotation:[],
				imageAnnotation:[],
				audioAnnotation:[],
				videoAnnotation:[],
				toJSON: TIARA.JSONglosses
			};
			i = editGlosses.insertSorted(newgloss,cmpGlosses);
			glossLib.add(new Option(word),glossLib.options[i] || null);
			glossLib.selectedIndex=i;
			_loadGloss(glossLib.value);
		}
		markGlosses(word);
	}