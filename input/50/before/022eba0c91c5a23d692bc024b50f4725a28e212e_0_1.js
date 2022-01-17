function(frame){
	// Called from robot when the robot completed its initialization.
	robotReady = true;
	robotFrame = frame;
	doh.robot._run = _run;
	// If initRobot was already called, then attach the iframe.
	if(iframe.src){
		attachIframe();
	}
}