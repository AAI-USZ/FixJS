function loadCodon(sequence){
    	var i,codonArray=[],currentCodon;
    	for(i=0;i<sequence.length;i+=3){
    		currentCodon=sequence.substring(i,i+3);
    		codonArray.push(currentCodon);
    	}
    	return codonArray;
    }