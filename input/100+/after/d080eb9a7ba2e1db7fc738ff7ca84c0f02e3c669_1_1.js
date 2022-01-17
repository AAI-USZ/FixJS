function(blockContainerId, object, opacity) {
	try {
		if(typeof(blockContainerId) == "string") blockContainerId = document.getElementById(blockContainerId) ;
		var blockContainer = blockContainerId ;
		var maskLayer = document.createElement("div") ;
		blockContainer.appendChild(maskLayer) ;
		maskLayer.className = "MaskLayer" ;
		maskLayer.id = object.id + "MaskLayer" ;
		maskLayer.maxZIndex = 3 ;
		maskLayer.style.width = blockContainer.offsetWidth + "px"  ;
		maskLayer.style.height =  blockContainer.offsetHeight + gj(blockContainer).offset().top + "px"  ;
		maskLayer.style.top = "0px" ;
		maskLayer.style.left = "0px" ;
		maskLayer.style.zIndex = maskLayer.maxZIndex ;
		if(opacity) {
		  gj(maskLayer).css({
        opacity : opacity
      });
		}
		
		if(object != null){
			if(object.nextSibling) {
			  maskLayer.nextSiblingOfObject = object.nextSibling ;
			  maskLayer.parentOfObject = null ;
				} else {
				  maskLayer.nextSiblingOfObject = null ;
				  maskLayer.parentOfObject = object.parentNode ;
				}
				
				object.style.zIndex = maskLayer.maxZIndex + 1 ;
				object.style.display = "block" ;
				
				blockContainer.appendChild(object) ;
	  }
		
	}catch(err) {}
	return maskLayer ;
}