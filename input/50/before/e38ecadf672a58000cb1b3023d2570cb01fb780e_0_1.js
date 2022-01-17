function showEcontentPurchaseOptions(id){
	var url = path + "/EContentRecord/" + id + "/AJAX?method=getPurchaseOptions";
	ajaxLightbox(url)
}