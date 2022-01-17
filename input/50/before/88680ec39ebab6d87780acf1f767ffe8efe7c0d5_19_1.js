function(mask){
	var ajaxLoading = document.getElementById("AjaxLoadingMask");
	ajaxLoading.style.display = "block";
	eXo.core.Browser.setOpacity(mask,30);
	mask.style.backgroundColor = "black";	
}