function setupOverviewAndDetail(overviewId, detailId) {



	// with new version may only need one scope

	//var ps = new paper.PaperScope();

	//paper = ps;

    //paperScopes.push(ps);

    

    var overviewCanvas = document.getElementById(overviewId);

    paper.setup(overviewCanvas);

    

    //var p = new paper.Project();

    //p.activate();



    // release 0.2.2

    //new paper.View(overviewCanvas);

    // later versions

    //paper.View.create(overviewCanvas);

    

    // for some reason, setting the size via CSS on the Canvas doesn't seem to work.

	// the view stays 300x150

	//ps.view.viewSize = new ps.Size(300,300);

    //var v = ps.view;    

	// Create a Paper.js Path to draw a line into it:

    

    createTestContent(paper);

   	

    // Draw the view now:

    //?ps.view.draw();

	

    var detailCanvas = document.getElementById(detailId);

    console.log('detailCanvas '+detailId+' = '+detailCanvas);

    // release 0.2.2

    //new ps.View(detailCanvas);

    //paper.View.create(detailCanvas);

    

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