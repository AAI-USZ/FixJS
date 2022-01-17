function(j, canvas) {
      // set canvas width and height since we usually don't do that
      // within the documentation
      canvas.width = $(canvas).width();
      canvas.height = $(canvas).height();
      
      // create the context and hook it into window for easier debugging.
      // if a renderer can't be found or any other init error occurs,
      // replace the canvas with a screenshot if available, and a generic
      // error message otherwise.
      try {
        window[label] = jax = new Jax.Context(canvas, {focus: false});
      } catch(e) {
        var ss, ele;
        var w = $(canvas).width(), h = $(canvas).height();
        if (ss = $(canvas).attr('data-screenshot')) {
          ele = document.createElement('img')
          $(ele).addClass('screenshot');
          $(ele).width(w);
          $(ele).height(h);
          $(ele).error(function(err) {
            var newe = document.createElement('div');
            $(newe).addClass('webgl-unavailable');
            $(newe).width($(ele).width());
            $(newe).height($(ele).height());
            $(newe).text("WebGL could not be initialized, and screenshot could not be loaded");
            $(ele).replaceWith($(newe));
            if (err.preventDefault) err.preventDefault();
            return false;
          });
          ele.src = ss;
        } else {
          ele = document.createElement('div');
          $(ele).addClass('webgl-unavailable');
          $(ele).width(w);
          $(ele).height(h);
          $(ele).text("WebGL could not be initialized, and no screenshot is available");
        }
        $(canvas).replaceWith($(ele));
        // sticky warning in bottom-right of screen
        if ($('.webgl-unavailable-notice').length == 0) {
          var url = 'http://www.khronos.org/webgl/wiki/Getting_a_WebGL_Implementation';
          ele = document.createElement('div');
          $(ele).addClass('webgl-unavailable-notice');
          $(ele).html('WebGL could not be loaded! To see live demos instead of boring screenshots, get <a href="'+url+'">a WebGL-enabled browser</a>.');
          $(document.body).append(ele);
        }
        return;
      }
      
      // set clear color to transparent
      jax.gl.clearColor(0, 0, 0, 0);
      
      // create a controller to contain example code
      Jax.Controller.create("example", {
        index: function() { }
      });
      
      // redirect to the controller to set up the scene
      jax.redirectTo("example");
      
      // execute setup and example code
      var example = new Function(exampleCode(tr));
      try {
        setup.call(jax.controller);
        example.call(jax.controller);
      } catch(error) {
        console.log(error.stack || error);
      }
    }