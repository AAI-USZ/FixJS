function loadimg(url) {
	var img = new Image();
	img.src = url;
	img.loaded = false;
	img.onload = function() {
	  img.loaded = true;
	}
	return img;
}