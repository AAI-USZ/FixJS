function show() {
    	if(orientation){
    		orientation = screen.mozOrientation;
    		oriDisplay.innerHTML = orientation;
    		oriStatus.innerHTML = "PASS";
      	}else{
	      	oriDisplay.innerHTML = "Not Supported";
    		oriStatus.innerHTML = "FAIL";
      	}
    }