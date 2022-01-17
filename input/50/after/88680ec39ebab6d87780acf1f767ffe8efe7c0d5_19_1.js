function(mask){
	var ajaxLoading = document.getElementById("AjaxLoadingMask");
	ajaxLoading.style.display = "block";
	gj(mask).css({
    opacity : 0.3,
    backgroundColor : 'black'
  });
}