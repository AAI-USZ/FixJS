function zoomOut() {

	if (!zoomView || !zoomPoint)

		return;

	// zoom away from zoomPoint in project space

	// had problems with main version - see top of file

	//console.log('zoomOut point='+zoomPoint+' zoom='+zoomView.zoom+' center='+zoomView.center);

	var zoom = zoomView.zoom;

	zoomView.zoom = zoomView.zoom*(1-ZOOM_RATIO);

	var dx = zoomPoint.x-zoomView.center.x;

	var dy = zoomPoint.y-zoomView.center.y;

	var sdx = (ZOOM_RATIO*dx*zoom)/zoomView.zoom;

	var sdy = (ZOOM_RATIO*dy*zoom)/zoomView.zoom;

	//console.log('- d='+dx+','+dy+' zoom\'='+zoomView.zoom+' sd='+sdx+','+sdy);

	zoomView.center = new paper.Point(zoomView.center.x-sdx, zoomView.center.y-sdy);

	//console.log('- center\'='+zoomView.center);

}