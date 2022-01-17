function setupOverviewAndDetail(overviewId, detailId) {



	var ps = new paper.PaperScope();

    paperScopes.push(ps);

    

    var overviewCanvas = document.getElementById(overviewId);

    //ps.setup(overviewCanvas);

    

    var p = new paper.Project();

    p.activate();



    new paper.View(overviewCanvas);

    // for some reason, setting the size via CSS on the Canvas doesn't seem to work.

	// the view stays 300x150

	//ps.view.viewSize = new ps.Size(300,300);

    //var v = ps.view;    

	// Create a Paper.js Path to draw a line into it:

    

    createTestContent(ps);

   	

    // Draw the view now:

    //?ps.view.draw();

	

    var detailCanvas = document.getElementById(detailId);

    console.log('detailCanvas '+detailId+' = '+detailCanvas);

    new ps.View(detailCanvas);

   

    // mouse/key tool

    /*

    var drawTool = new ps.Tool();

    drawTool.onMouseDown = function(event) {

    	paper = ps;



    	console.log('onMouseDown('+event.point+')');

    };

    drawTool.onMouseDrag = function(event) {

    	paper = ps;



    	console.log('onMouseDrag('+event.point+')');

    };

    drawTool.onMouseUp = function(event) { 

    	paper = ps;



    	console.log('onMouseUp('+event.point+')');

    };

    drawTool.onMouseMove = function(event) { 

    	paper = ps;



    	console.log('onMouseMove('+event.point+')');

    };

    //drawTool.onKeyDown = function(event) {

    //	console.log('onKeyDown('+event.key+')');

    //};

    //drawTool.onKeyUp = function(event) {

    //	console.log('onKeyUp('+event.key+')');

    //};

    drawTool.activate();

	*/

}