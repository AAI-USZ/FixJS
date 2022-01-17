function initDisplay(){

	var all = $("#mainPane").innerWidth();
	var left = $("#leftPane").outerWidth();
	var right = $("#rightPane").outerWidth();
	$("#middlePane").width(all - left - right);
	$("#previewDiv").width(right);

	//$("#mainCanvas").attr("width", all-left-right);
	window.collageCanvas.size(all-left-right, $("#middlePane").innerHeight());
	window.previewCanvas.size(right, 300);
	//window.collageCanvas.updateUI();
	//$("#previewCanvas").attr("width", right);

	$("#mainCanvas").css("border", "solid 1px black");
	$("#previewCanvas").css("border", "solid 1px black");
}