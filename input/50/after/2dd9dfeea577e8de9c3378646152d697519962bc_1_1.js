function hide () {
		
		if (isShowed) {
    	el = document.getElementById("overlay");
  		el.style.visibility =  "hidden";
			isShowed = false
		}    
  }