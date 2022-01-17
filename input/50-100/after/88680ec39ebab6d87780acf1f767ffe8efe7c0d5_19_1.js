function() {
	var Browser = eXo.core.Browser ;
	var ajaxLoading = document.getElementById("AjaxLoadingMask") ;
	var maskLayer = eXo.wiki.UIWikiMaskLayer.createMask("UIPortalApplication", ajaxLoading, 0) ;
	Browser.addOnScrollCallback("5439383", eXo.wiki.UIWikiMaskLayer.setPosition) ;
							
	ajaxLoading.style.display = "none";
	gj(maskLayer).css({
    opacity : 0,
    backgroundColor : 'white',
    cursor : 'wait'
  });	
	return maskLayer;
}