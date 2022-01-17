function loadCodon(sequence){
    	var i,codonArray=[],currentCodon,seq;
    	seq=removeSpaces(sequence);
    	seq=seq.toUpperCase();
    	for(i=0;i<sequence.length-3;i+=3){
    		currentCodon=seq.substring(i,i+3);
    		if(!currentCodon){
    			throw new Error("extra codon asked for");
    		}
    		codonArray.push(currentCodon);
    	}
    	return codonArray;
    }