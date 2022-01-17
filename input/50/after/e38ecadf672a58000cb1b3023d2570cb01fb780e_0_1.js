function showEcontentPurchaseOptions(id){
	var url = path + "/EcontentRecord/" + id + "/AJAX?method=getPurchaseOptions";
	ajaxLightbox(url)
}