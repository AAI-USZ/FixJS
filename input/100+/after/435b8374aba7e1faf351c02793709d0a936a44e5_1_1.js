function () {

  var canvas = document.getElementById("graph_paper");
  var panel  = $('.debug_panel');

  var xOrigin = canvas.width / 2;
  var yOrigin = (canvas.height / 4) * 3;

  var d_to_r = "30 degrees: " + degrees_to_radians(30) + " radians";
  var d_to_r = "180 degrees: " + degrees_to_radians(180) + " radians";

  var r_to_d = "1 radian: " + radians_to_degrees(1) + " degrees";
  var r_to_d = "3.14 radians: " + radians_to_degrees(3.14) + " degrees";

  if (canvas.getContext) {

      panel.html(
 'a = 10<br/>'
+'b = 20<br/>'
+'c = Math.sqrt((a * a) + (b * b))<br/>'
	      + Math.sqrt((10 * 10) + (20 * 20))
+'<br/>'
+'Math.round(c * 10)/10<br/>'
	      + Math.round(Math.sqrt((10 * 10) + (20 * 20)) * 10) / 10
      );

//      document.writeln("(a*a)+(b*b)=(c*c)"+"<br />"
//                      +"a = 10"+"<br />"
//                      +"b=20"+"<br />"
//                       +"c="+Math.sqrt(100+400));
//      document.writeln(radians_to_degrees(sine_angle(10,22.36)));
//      document.writeln(degrees_to_radians(sine_angle(1,3)));
//      document.writeln(sine_O(degrees_to_radians(30),3));
    var ctx = canvas.getContext("2d");

    drawGrid(ctx, canvas);
    drawAxes(ctx, canvas, xOrigin, yOrigin);

    var Ax = xOrigin + 10;
    var Ay = yOrigin - 10;

    var Bx = xOrigin + 210;
    var By = yOrigin - 10;

    var Cx = xOrigin + 10;
    var Cy = yOrigin - 110;

    drawPoint(ctx, Ax, Ay);
    drawPoint(ctx, Bx, By);
    drawPoint(ctx, Cx, Cy);
    drawLine(ctx, Ax, Ay, Bx, By);
    drawLine(ctx, Bx, By, Cx, Cy);
    drawLine(ctx, Cx, Cy, Ax, Ay);
    drawRect(ctx, Ax, Ay - 20, 20, 20);
//    drawTrace(ctx);
//    draw1Radian(ctx);

  } else {

    alert('Your browser does not support canvas.')

  }
}