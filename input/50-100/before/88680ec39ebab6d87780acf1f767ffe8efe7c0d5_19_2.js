function() {
	var maskLayer = document.getElementById("MaskLayer");
	if (maskLayer) {
		maskLayer.style.width = eXo.core.Browser.getBrowserWidth() + "px";
		maskLayer.style.height = eXo.core.Browser.getBrowserHeight() + "px";
	}
}