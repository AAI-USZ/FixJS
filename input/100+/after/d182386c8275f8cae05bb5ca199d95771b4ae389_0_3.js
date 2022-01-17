function zoomIn() {

	if (!zoomView || !zoomPoint)

		return;

	// zoom towards zoomPoint in project space

	var zoom = zoomView.zoom;

	// had problems with main version - see top of file

	//console.log('zoomIn point='+zoomPoint+' zoom='+zoomView.zoom+' center='+zoomView.center);

	zoomView.zoom = Math.min(MAX_ZOOM, zoomView.zoom*(1+ZOOM_RATIO));

	var dx = zoomPoint.x-zoomView.center.x;

	var dy = zoomPoint.y-zoomView.center.y;

	var sdx = (ZOOM_RATIO*dx*zoom)/zoomView.zoom;

	var sdy = (ZOOM_RATIO*dy*zoom)/zoomView.zoom;

	//console.log('- d='+dx+','+dy+' zoom\'='+zoomView.zoom+' sd='+sdx+','+sdy);

	zoomView.center = new paper.Point(zoomView.center.x+sdx, zoomView.center.y+sdy);

	//console.log('- center\'='+zoomView.center);

}