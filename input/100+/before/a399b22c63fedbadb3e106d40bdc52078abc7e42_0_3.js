function(point, view) {

	zoomPoint = point;

	zoomView = view;

	zoomInterval = setInterval(zoomOut, ZOOM_INTERVAL);

	zoomOut();

}