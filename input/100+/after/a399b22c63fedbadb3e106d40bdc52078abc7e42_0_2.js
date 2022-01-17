function createTestContent(ps) {

	paper = ps;

	

    // some test content

    var path = new ps.Path();

    // Give the stroke a color

    path.strokeColor = 'black';

    var start = new ps.Point(100, 100);

    // Move to start and draw a line from there

    path.moveTo(start);

    // Note the plus operator on Point objects.

    // PaperScript does that for us, and much more!

    path.lineTo(new ps.Point( 200, 50 ));



   	var myPath;    

   	myPath = new ps.Path();

   	myPath.strokeColor = 'black';

   	myPath.strokeWidth = 3;

   	myPath.add(new ps.Point(100,100));

   	myPath.add(new ps.Point(200,200));

   	

   	myPath = new ps.Path.Line(new ps.Point(200,100), new ps.Point(100,200));

   	myPath.strokeColor = 'black';

   	myPath.strokeWidth = 3;



   	var myCircle = new ps.Path.Circle(new paper.Point(150,150), 30);

   	myCircle.fillColor = 'black';

   	

   	/*

   	// some test interactivity

    var drawTool = new ps.Tool();

    drawTool.onMouseDown = function(event) {

    	paper = ps;



    	//console.log('onMouseDown('+event.point+')');

    	

    	var myCircle = new ps.Path.Circle(event.point, 3);

    	myCircle.fillColor = 'black';

    	

    	myPath = new ps.Path();

    	myPath.strokeColor = 'black';

    	myPath.add(event.point);

    	//console.log('myPath='+myPath);

    };

    drawTool.onMouseDrag = function(event) {

    	paper = ps;



    	//console.log('myPath='+myPath);

    	myPath.add(event.point);

    	//console.log('onMouseDrag');

    };

    drawTool.onMouseUp = function(event) { 

    	paper = ps;



    	myPath.simplify();



    	redraw(ps);

    };

    drawTool.activate();

	*/

}