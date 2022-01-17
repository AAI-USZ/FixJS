function() {
	var UIWikiMaskLayer = eXo.wiki.UIWikiMaskLayer ;
	var object = UIWikiMaskLayer.object ;
	var blockContainer = UIWikiMaskLayer.blockContainer ;
	var position = UIWikiMaskLayer.position ;
	object.style.position = "absolute" ;
	
	var left ;
	var top ;
	var topPos ;
	if (document.documentElement && document.documentElement.scrollTop) { 
		topPos = document.documentElement.scrollTop ;
	} else {
		topPos = document.body.scrollTop ;
	}
	if (position == "TOP-LEFT") {
	  left = 0 ;
	  top = 0 ;
	} else if (position == "TOP-RIGHT") {
		return ;
	} else if (position == "BOTTOM-LEFT") {
	  left = 0 ;
	  top = gj(document).height() - object.offsetHeight + topPos ;
	} else if (position == "BOTTOM-RIGHT") {
	  left = blockContainer.offsetWidth - object.offsetWidth ;
	  top = gj(document).height() - object.offsetHeight + topPos ;
	} else {
	  left = (blockContainer.offsetWidth - object.offsetWidth) / 2 ;
	  top = (gj(document).height() - object.offsetHeight) / 2 +  topPos ;
	}
	
	object.style.left = left + "px" ;
	object.style.top = top + "px" ;
}