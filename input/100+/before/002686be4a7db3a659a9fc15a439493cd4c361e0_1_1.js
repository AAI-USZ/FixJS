function() {
	// check storage for local copy of code & default tab
	var progTextArea = document.getElementById("prog_textarea");
	if(window["localStorage"]) {
		var progText = localStorage.getItem("program");
		if(progText != null) {
			defaultCode = progTextArea.value;
			progTextArea.value = progText;
		}
		defaulttab = localStorage.getItem("defaulttab");
		if (defaulttab != null) {
			defaultTabNum = parseInt(defaulttab);
		}
	}
	
	// set up syntax highlighting for custom prog
	progCodeMirror = CodeMirror.fromTextArea(progTextArea);
	
	// load the custom 
	// (only necessary if it has changed, but need code mirror, so whatevz)
	loadCustom();
	
	// set up syntax highlighting for simuware api
	var swTextArea = document.getElementById("simuware_textarea");
	swCodeMirror = CodeMirror.fromTextArea(swTextArea, {readOnly:true});
	
	// Resize if necessary to fit the browser size
	var bsize = getBrowserWindowSizeInit();
	var asize = getAppSize(APP_WIDTH, APP_HEIGHT, bsize.width, bsize.height-70);
	resizeApp(asize);
	
	// loading custom program
	document.getElementById("loadBtn").onclick = loadCustom;
	document.getElementById("revertBtn").onclick = revertToDefault;
	
	// canvas stuff
	var canvas = document.getElementById("canvas");
	canvas.onkeypress = keyPressed;
	
	// create globals for robot and obstacles (accessed all over the place)
	robotState = makeState(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, Math.random()*2*PI, ROBOT_DIM);
	baseState = {x:CANVAS_WIDTH/2, y:CANVAS_HEIGHT/2, theta:PI*3/2};
	createObstacles();
	
	// get optimizers
	gdo = makeGDO(obstacles, CANVAS_WIDTH, CANVAS_HEIGHT, blockDividers);
	
	// kick off sensors
	robotState.updateDistSensor(obstacles);
	if(blackTape)
		robotState.updateLineSensor(blackTape);
		
	// initialize particleVectors
	particleVectors = [];
	
	// start state-updater and repainter
	vel1 = vel2 = 0;
	setInterval("updateState();", 60);
	setInterval("repaint();", 60);
	
	// initialize sub programs
	//initProg("particle filter", pf_main, pf_loop, function() { return true;}, 100);
	//initProg("line follower", ls_main, ls_loop, function() { return lineFollowerOn;}, 100);
	//initProg("wall follower", wf_main, wf_loop, function() { return wallFollowerOn;}, 100);
	//initProg("custom program", cp_main, function() { cp_loop(); }, 
	//	function() { return customOn; }, 100);

	canvas.onmousedown = touch;
}