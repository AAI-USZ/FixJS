function(frame){
	// Called from robot when the robot has completed its initialization.
	robotReady = true;
	robotFrame = frame;
	doh.robot._run = _run;

	// If initRobot was already called, then attach the iframe.
	if(iframeUrl){
		attachIframe(iframeUrl);
	}
}