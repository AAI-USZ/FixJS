function show() {
    	if(orientation){
    		oriDisplay.innerHTML = orientation;
    		oriStatus.innerHTML = "PASS";
      	}else{
	      	oriDisplay.innerHTML = "Not Supported";
    		oriStatus.innerHTML = "FAIL";
      	}
    }