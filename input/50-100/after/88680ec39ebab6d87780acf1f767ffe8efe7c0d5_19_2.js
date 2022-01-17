function() {
	var maskLayer = document.getElementById("MaskLayer");
	if (maskLayer) {
		maskLayer.style.width = gj(document).width() + "px";
		maskLayer.style.height = gj(document).height() + "px";
	}
}