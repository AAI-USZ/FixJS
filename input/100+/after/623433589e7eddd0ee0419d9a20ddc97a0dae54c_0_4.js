function(e){
      if(e.target == kb.focusBox){
	if(specialMode && e.which != 17 && e.which != 16 && !e.ctrlKey){
	  alpha = String.fromCharCode(e.charCode).toLocaleUpperCase();
	  foxtrot = alpha == delta ? foxtrot+1: 0;
	  if(foxtrot==0){
	    hotel=0;
	  }
	  delta = alpha;
	  beta = kb.alphaSet[alpha];
	  if(beta != undefined){
	    gamma = beta[foxtrot % beta.length].letter;
	    e.preventDefault();
	    kb.writeToBox(gamma, hotel);
	    hotel = gamma.length;
	  }
	}
      }
    }