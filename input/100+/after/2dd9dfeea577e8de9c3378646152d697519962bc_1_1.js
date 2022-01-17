function () {

	var isShowed = false
	
  function show () {
		if (!isShowed) {
  		el = document.getElementById("overlay");
  		el.style.visibility =  "visible";
			isShowed = true
		}
  };
  
  function hide () {
		
		if (isShowed) {
    	el = document.getElementById("overlay");
  		el.style.visibility =  "hidden";
			isShowed = false
		}    
  }
  
  
  function operate () {
    el = document.getElementById("overlay");
  	el.style.visibility = 
          (el.style.visibility == "visible")? "hidden": "visible";
  }
	
	
	function isDisplayed () {
		return isShowed
	}
	
  
  function test () {
    alert ("overlay is reachable!!!");
  }
  
  return {
    test: test,
    show: show,
    hide: hide
  }
  
}