function(successCallback, failureCallback, canvasId) {
	// successCallback required
	if (typeof successCallback != "function") {
        console.log("Canvas2ImagePlugin Error: successCallback is not a function");
        return;
    }
	if (typeof failureCallback != "function") {
        console.log("Canvas2ImagePlugin Error: failureCallback is not a function");
        return;
    }
	var canvas = document.getElementById(canvasId);
	var imageData = canvas.toDataURL().replace(/data:image\/png;base64,/,'');
	if (typeof PhoneGap !== "undefined") {
		PhoneGap.exec(successCallback, failureCallback, "Canvas2ImagePlugin","saveImageDataToLibrary",[imageData]);
	}
	if (typeof Cordova !== "undefined") {
		Cordova.exec(successCallback, failureCallback, "Canvas2ImagePlugin","saveImageDataToLibrary",[imageData]);
	}
}