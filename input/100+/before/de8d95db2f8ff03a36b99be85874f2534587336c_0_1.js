function(options) {

  // grab canvas element

  var drawing = false;

  var moved = false;

  var canvas = document.getElementById(options.id),

  ctxt = canvas.getContext("2d");



  canvas.style.width = '100%'

  canvas.width = canvas.offsetWidth;

  canvas.style.width = '';



  canvas.style.height = $("body").height();

  canvas.height = canvas.offsetHeight;

  //canvas.style.height = '';



  Mx = 0;

  My = 0;

  mx = canvas.width;

  my = canvas.height;



  // set props from options, but the defaults are for the cool kids

  ctxt.lineWidth = options.size || Math.ceil(Math.random() * 35);

  ctxt.lineCap = options.lineCap || "round";

  ctxt.pX = undefined;

  ctxt.pY = undefined;



  ctxt.fillStyle = "white";

  ctxt.fillRect(0,0,canvas.width, canvas.height);



  if (options.bg) {

    $("body").append("<img src='"+options.bg+"' onload='onImageLoaded(this)' style='display:none;' />");

  }



  var lines = [,,];

  var lineDrawData; // saves line drawing information in a single array 

  var offset = $(canvas).offset();

               

  var self = {

    //bind click events

    init: function() {

      //set pX and pY from first click

      canvas.addEventListener('touchstart', self.preDraw, false);

      canvas.addEventListener('touchmove', self.draw, false);

	  canvas.addEventListener('touchend', self.postDraw, false);



      return this;

    },

    postDraw: function(event) {

	  if (!moved) {

		// draw a point instead of a line

		var centerX = lines[0].x;

		var centerY = lines[0].y;

		var radius = parseInt($("#width").val()) / 2;

		var color = $("#color").css("background-color");

                var pt = {};

		pt.x = centerX - radius;

		pt.y = centerY - radius;

                updateBounds(ctxt, pt);

		pt.x = centerX + radius;

		pt.y = centerY + radius;

                updateBounds(ctxt, pt);

		drawPoint(ctxt, centerX, centerY, radius, color);

		

		// save to undo stack

		var toStack = { type: "point", data: {x: centerX, y: centerY, r: radius, color: color} };

		undoStack.push(toStack);

	  } else {

		// save line to undo stack

		var toStack = { type: "line", data: lineDrawData };

		undoStack.push(toStack);

	  }

	  moved = false;

      drawing = false;

    },

    preDraw: function(event) {

	  lineDrawData = new Array();

      offset = $(canvas).offset();

      if (event.type == "mousedown") {

        drawing = true;

        lines[0] = { x : this.pageX - offset.left,

                     y : this.pageY - offset.top,

                     color : $("#color").css("background-color"),

					 size: parseInt($("#width").val())

                   };

      } else {

        $.each(event.touches, function(i, touch) {

          var id = touch.identifier;

          lines[id] = { x : this.pageX - offset.left, 

                        y : this.pageY - offset.top, 

                        color : $("#color").css("background-color"),

						size: parseInt($("#width").val())

                       };

        });

      }

      event.preventDefault();

    },



    draw: function(event) {

      if (event.type == "mousemove") {

        if (!drawing) {

          return;

        }



        var id = 0;

        moveX = this.pageX - offset.left - event.x;

        moveY = this.pageY - offset.top - event.y;

        var ret = self.move(0, moveX, moveY);

        updateBounds(ctxt, ret);

        lines[0].x = ret.x;

        lines[0].y = ret.y;

      } else {

        var e = event;

        $.each(event.touches, function(i, touch) {

          var id = touch.identifier,

              moveX = this.pageX - offset.left - lines[id].x,

              moveY = this.pageY - offset.top - lines[id].y;

          var ret = self.move(id, moveX, moveY);

          updateBounds(ctxt, ret);

          lines[id].x = ret.x;

          lines[id].y = ret.y;

        });

      }

      event.preventDefault();

    },



    move: function(i, changeX, changeY) {

	  moved = true;

	  if (usingEraser) {

		lines[i].color = "#fff";

	  }

	  drawLine(ctxt, lines[i].x, lines[i].y, changeX, changeY, lines[i].size, lines[i].color);

	  

	  // save lines to undo stack

	  var toLineDraw = { x: lines[i].x, y: lines[i].y, 

						changeX: changeX, changeY: changeY,

						color: ctxt.strokeStyle,

						size: lines[i].size };

	  lineDrawData.push(toLineDraw);



      return { x: lines[i].x + changeX, y: lines[i].y + changeY};

    },

  };

  return self.init();

}