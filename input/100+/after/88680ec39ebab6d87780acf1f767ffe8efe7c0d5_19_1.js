function(blockContainerId, object, opacity, position) {
	try {
		var Browser = eXo.core.Browser ;
		var blockContainer = document.getElementById(blockContainerId) ;
		var maskLayer = document.createElement("div") ;
		
		this.object = object ;
		 maskLayer.object= object;
		this.blockContainer = blockContainer ;
		this.position = position ;
		
		if (document.getElementById("MaskLayer")) {
			/*
			 * minh.js.exo
			 * fix for double id : MaskLayer
			 * reference with method eXo.wiki.UIWikiMaskLayer.doScroll()
			 */
			document.getElementById("MaskLayer").id = "subMaskLayer";
		}
		blockContainer.appendChild(maskLayer) ;
		
		maskLayer.className = "MaskLayer" ;
		maskLayer.id = "MaskLayer" ;
		maskLayer.maxZIndex = 4; //3 ;
		maskLayer.style.width = gj(document).width() + "px";
		maskLayer.style.height = gj(document).height() + "px";
		maskLayer.style.top = "0px" ;
		maskLayer.style.left = "0px" ;
		maskLayer.style.zIndex = maskLayer.maxZIndex ;

    if (opacity) {
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
			
			//object.style.zIndex = maskLayer.maxZIndex + 1 ;
			object.style.zIndex = maskLayer.maxZIndex;			
			object.style.display = "block" ;
			
			blockContainer.appendChild(object) ;
		
			eXo.wiki.UIWikiMaskLayer.setPosition() ;
			if(eXo.core.I18n.isLT()) {
				if((blockContainer.offsetWidth > object.offsetLeft + object.offsetWidth) && (position == "TOP-RIGHT") || (position == "BOTTOM-RIGHT")) {
			    object.style.left = blockContainer.offsetWidth - object.offsetWidth + "px" ;
				}
			}
			eXo.wiki.UIWikiMaskLayer.doScroll() ;
	  }
		if(maskLayer.parentNode.id == "UIPage") {
			eXo.wiki.UIWikiMaskLayer.enablePageDesktop(false);
	  }
	}catch(err) {
		alert(err) ;
	}
	Browser.addOnResizeCallback(maskLayer.id, eXo.wiki.UIWikiMaskLayer.resizeMaskLayer);
	return maskLayer ;
}