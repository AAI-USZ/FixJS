function initDisplay(){

	var all = $("#mainPane").innerWidth();
	var left = $("#leftPane").outerWidth();
	var rightOut = $("#rightPane").outerWidth();
	var rightIn = $("#rightPane").innerWidth();
	$("#middlePane").width(all - left - rightOut);
	$("#previewDiv").width(rightIn);

	//$("#mainCanvas").attr("width", all-left-right);
	window.collageCanvas.size($("#middlePane").innerWidth(), $("#middlePane").innerHeight());
	window.previewCanvas.size($("#previewDiv").innerWidth(), 300);
	//window.collageCanvas.updateUI();
	//$("#previewCanvas").attr("width", right);

	//$("#mainCanvas").css("border", "solid 1px black");
	//$("#previewCanvas").css("border", "none");
}