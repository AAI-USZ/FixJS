function($, window) {

  var Spin = window.SpriteSpin = {};
  
  Spin.modules = {};
  Spin.behaviors = {};
  var api = Spin.api = {};
	  
  Spin.updateInput = function(e, data){
    if (e.touches === undefined && e.originalEvent !== undefined){
      // jQuery Event normalization does not preserve the 'event.touches'
      // try to grab touches from the original event
      e.touches = e.originalEvent.touches;
    }
    
    data.oldX = data.currentX;
    data.oldY = data.currentY;
    
    if (e.touches !== undefined && e.touches.length > 0){
      data.currentX = e.touches[0].clientX;
      data.currentY = e.touches[0].clientY;
    } else {
      data.currentX = e.clientX;
      data.currentY = e.clientY;
    }
    
    if (data.startX === undefined || data.startY === undefined){
      data.startX = data.currentX;
      data.startY = data.currentY;
      data.clickframe = data.frame;
    }
    
    if (data.oldX === undefined || data.oldY === undefined){
      data.oldX = data.currentX;
      data.oldY = data.currentY;
    }
    
    // total drag distance
    data.dX = data.currentX - data.startX;
    data.dY = data.currentY - data.startY;
    data.dW = data.dX * data.dragDirX + data.dY * data.dragDirY;
    
    // frame drag distance
    data.ddX = data.currentX - data.oldX;
    data.ddY = data.currentY - data.oldY;
    data.ddW = data.ddX * data.dragDirX + data.ddY * data.dragDirY;
    
    return false;
  };
  
  Spin.resetInput = function(data){
    // initial touch or click position
    data.startX = undefined;
    data.startY = undefined;
    // touch or click position in current frame
    data.currentX = undefined;
    data.currentY = undefined;
    // touch or click position in last frame
    data.oldX = undefined;
    data.oldY = undefined;
    // total drag distance, respecting the start position
    data.dX = 0;
    data.dY = 0;
    data.dW = 0;
    // total drag distance, respecting the last frame position
    data.ddX = 0;
    data.ddY = 0;
    data.ddW = 0;
    
    if (typeof(data.module.resetInput) === "function"){
      data.module.resetInput(data);
    }
  };
  
  Spin.clamp = function(value, min, max){ 
    return (value > max ? max : (value < min ? min : value));
  };
  
  Spin.wrap = function(value, min, max){
    while (value > max){ value -= max; } 
    while (value < min){ value += max; }
    return value;
  };
  
  Spin.reload = function(data, andInit){
    if (andInit && data.module.initialize){
      data.module.initialize(data);
    }
    
    Spin.prepareBackground(data);
    Spin.preloadImages(data, function(){
      Spin.rebindEvents(data);
      data.module.reload(data);
      data.target.trigger("onLoad", data);
    });
  };
  
  Spin.preloadImages = function(data, callback) {
    data.preload.fadeIn(250, function(){
      new SpriteLoader(data.source, function(loader){
        data.preload.fadeOut(250);
        data.stage.show();
        if (data.canvas){
          data.canvas.show();
        }
        data.images = loader.images;
        callback.apply(data.target, [data]);
      });
    });
  };
  
  Spin.prepareBackground = function(data){
    var w = [data.width, "px"].join("");
    var h = [data.height, "px"].join("");
    
    data.target.css({ 
      width    : w, 
      height   : h,
      position : "relative"
    });
    
    var css = {
      width    : w, 
      height   : h,
      top      : "0px", 
      left     : "0px",
      position : "absolute"  
    };
    $.extend(css, data.preloadCSS || {});
    data.preload.css(css).html(data.preloadHtml || "").hide();
    
    data.stage.css({
      width    : w, 
      height   : h,
      top      : "0px", 
      left     : "0px",
      position : "absolute"
    }).hide();
    
    if (data.canvas){
      data.canvas[0].width = data.width;
      data.canvas[0].height = data.height;      
      data.canvas.css({
        width    : w, 
        height   : h,
        top      : "0px", 
        left     : "0px",
        position : "absolute"
      }).hide();
    }
  };
  
  Spin.draw = function(data){
    data.module.draw(data);
  };
  
  Spin.rebindEvents = function(data){
    var target = data.target;
    // unbind all events
    target.unbind('.spritespin');
  
    // use custom or build in behavior
    var currentBehavior = data.behavior;
    if (typeof(data.behavior) === "string"){
      currentBehavior = Spin.behaviors[data.behavior];
    }
    
    var prevent = function(e){
      if (e.cancelable){
        e.preventDefault();
      }
      return false;
    };
    
    // rebind interaction events
    target.bind('mousedown.spritespin',  currentBehavior.mousedown);
    target.bind('mousemove.spritespin',  currentBehavior.mousemove);
    target.bind('mouseup.spritespin',    currentBehavior.mouseup);
    target.bind('mouseenter.spritespin', currentBehavior.mouseenter);
    target.bind('mouseover.spritespin',  currentBehavior.mouseover);
    target.bind('mouseleave.spritespin', currentBehavior.mouseleave);
    target.bind('dblclick.spritespin',   currentBehavior.dblclick);
    target.bind('onFrame.spritespin',    currentBehavior.onFrame);
  
    if (data.touchable){
      target.bind('touchstart.spritespin',  currentBehavior.mousedown);
      target.bind('touchmove.spritespin',   currentBehavior.mousemove);
      target.bind('touchend.spritespin',    currentBehavior.mouseup); 
      target.bind('touchcancel.spritespin', currentBehavior.mouseleave);
      target.bind('click.spritespin',         prevent); 
      target.bind('gesturestart.spritespin',  prevent); 
      target.bind('gesturechange.spritespin', prevent); 
      target.bind('gestureend.spritespin',    prevent); 
    }
            
    // disable selection
	  target.bind("mousedown.spritespin selectstart.spritespin", prevent);
	  
	  target.bind("onFrame.spritespin", function(event, data){
	    Spin.draw(data);
	  });
	  target.bind("onLoad.spritespin", function(event, data){
	    data.target.spritespin("animate", data.animate, data.loop);
	  });
	  
	  // bind custom events
	  if (typeof(data.onFrame) === "function"){
	    target.bind("onFrame.spritespin", data.onFrame);
	  }
	  if (typeof(data.onLoad) === "function"){
	    target.bind("onLoad.spritespin", data.onLoad);
	  }
  };
	
  $.fn.spritespin = function(method) {
    if ( api[method] ) {
      return api[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    }
    if (typeof(method) === 'object' || !method) {
      return api.init.apply(this, arguments);
    }
    $.error( 'Method ' +  method + ' does not exist on jQuery.spritespin' );
  };


	api.init = function(options){
    // Default settings
    var settings = {
      // dimensions
      width             : undefined,              // Window width (or frame width)
      height            : undefined,              // Window height (or frame height)
      frames            : 36,                     // Total number of frames
      frame             : 0,                      // Initial frame number
      
      // animation & update
      animate           : true,                   // Run animation when after initialize
      loop              : false,                  // Repeat animation in a loop
      loopFrame         : 0,                      // Indicates the loop start frame
      frameTime         : 36,                     // Time between updates
      frameWrap         : true,
      reverse           : false,                  // If true animation is played backward
      sense             : 1,                      // Interaction sensitivity used by behavior implementations
      orientation       : "horizontal",
      
      // appearance               
      source            : undefined,              // Stiched source image
      preloadHtml       : undefined,              // Html to appear when images are preloaded
      preloadCSS        : undefined,
      
      // events
      onFrame           : undefined,              // Occurs whe frame has been updated
      onLoad            : undefined,              // Occurs when images are loaded
      touchable         : undefined              // Tells spritespin that it is running on a touchable device
    };
    
    // extending options
    options = (options || {});
    $.extend(settings, options);
    
    return this.each(function(){
      var $this = $(this);
      var data  = $this.data('spritespin');
      
      if (!data){
        // spritespin is not initialized
        
        var images = $this.find("img");
        var i = 0;
        if (images.length > 0){
          settings.source = [];
          for(i = 0; i < images.length; i += 1){
            settings.source.push($(images[i]).attr("src"));
          }
        }
        
        if (typeof(settings.source) === "string"){
          settings.source = [settings.source];
        }
        
        // disable selection & hide overflow
        $this.attr("unselectable", "on").css({ 
          overflow : "hidden", 
          position : "relative"
        });
        
        // build inner html
        $this.empty();
        $this.append($("<div class='spritespin-stage'/>"));
        $this.append($("<div class='spritespin-preload'/>"));
        $this.addClass("spritespin-instance");
        
        if (settings.enableCanvas){
          var canvas = $("<canvas class='spritespin-canvas'/>")[0];
          var supported = !!(canvas.getContext && canvas.getContext('2d'));
          if (supported){
            settings.canvas = $(canvas);
            settings.context = canvas.getContext("2d");
            $this.append(settings.canvas);
          }
        }

        // resolve module
        if (typeof(settings.module) === "string"){
          settings.module = SpriteSpin.modules[settings.module];
        }
        if (!settings.module){
          settings.module = SpriteSpin360;
        }
        
        // build data
        settings.target = $this;
        settings.stage = $this.find(".spritespin-stage");
        settings.preload = $this.find(".spritespin-preload");
        settings.animation = null;
        settings.touchable =(settings.touchable || (/iphone|ipod|ipad|android/i).test(window.navigator.userAgent));
        
        $this.data('spritespin', settings);
        SpriteSpin.reload(settings, true);
      } else {
        // spritespin is initialized.
        $.extend(data, options);

        if (options.source){
          // when images are passed, need to reload the plugin
          SpriteSpin.reload(data);
        } else {
          // otherwise just reanimate spritespin
          $this.spritespin("animate", data.animate, data.loop);
        }
      }
    });
  };
  
	api.destroy = function(){
    return this.each(function(){
      var $this = $(this);
      $this.unbind('.spritespin');
      $this.removeData('spritespin');
    });
  };

  // Updates a single frame to the specified frame number. If no value is 
  // given this will increment the current frame counter.
  // Triggers the onFrame event
  api.update = function(frame){
    return this.each(function(){
      var $this = $(this);
      var data = $this.data('spritespin');
      
      // update frame counter
      if (frame === undefined){
        data.frame = (data.frame + (data.reverse ? -1 : 1));
      } else {
        data.frame = frame;
      }
      
      // wrap/clamp the frame value to fit in range [0, data.frames]
      if ((data.animation !== null) && data.loop || 
          (data.animation == null) && data.frameWrap){
        data.frame = Spin.wrap(data.frame, 0, data.frames - 1);
      } else {
        data.frame = Spin.clamp(data.frame, 0, data.frames - 1);
      }

      // stop animation if the loopFrame is reached
      if (!data.loop && (data.animation !== null) && (data.frame === data.loopFrame)){
        api.animate.apply(data.target, [false]);
      }
      
      data.target.trigger("onFrame", data);
    });
  };

  // Starts or stops the animation depend on the animate paramter.
  // In case when animation is already running pass "false" to stop.
  // In case when animation is not running pass "true" to start.
  // To keep animation running forever pass "true" for the loop parameter.
  // To detect whether the animation is running or not, do not pass any
  // parameters.
  api.animate = function(animate, loop){
    if (animate === undefined){
      return $(this).data('spritespin').animation !== null;
    } 
    return this.each(function(){
      var $this = $(this);
      var data = $this.data('spritespin');
      
      // check the loop variable and update settings
      if (typeof(loop) === "boolean"){
        data.loop = loop;
      }
      // toggle and update animation settings
      if (animate === "toggle"){
        data.animate = !data.animate;
      }
      //
      if (typeof(animate) === "boolean"){
        data.animate = animate;
      }
      // stop the running animation
      if (data.animation !== null){
        window.clearInterval(data.animation);
        data.animation = null;
      }
      // start animation
      if (data.animate){
        data.animation = window.setInterval(function(){ 
          try { 
            $this.spritespin("update"); 
          } catch(err){
            // The try catch block is a hack for Opera Browser
            // Opera sometimes rises an exception here and
            // stops performing the script
          }
        }, data.frameTime);
      }  
    });
  };

  // Gets the current framenumber when no parameter is passed or
  // updates the spinner to the sepcified frame.
  api.frame = function(frame){
    if (frame === undefined){
      return $(this).data('spritespin').frame;
    }
    return this.each(function(){
      $(this).spritespin("update", frame);
    });        
  };

  // Gets or sets a value indicating whether the animation is looped or not.
  // Starts the animation when settings.animate is set to true passed value
  // is defined
  api.loop = function(value){
    if (value === undefined){
      return $(this).data('spritespin').loop;
    }
    return this.each(function(){
      var $this = $(this);
      $this.spritespin("animate", $this.data('spritespin').animate, value);
    }); 
  };

  api.next = function(){
    return this.each(function(){
      var $this = $(this);
      var data = $this.data('spritespin');
      $this.spritespin("frame", data.frame + (data.reverse ? -1 : 1));
    }); 
  };
  
  api.prev = function(){
    return this.each(function(){
      var $this = $(this);
      var data = $this.data('spritespin');
      $this.spritespin("frame", data.frame - (data.reverse ? -1 : 1));
    });
  };
  
  Spin.behaviors.none = {
    name : "none",
    mousedown  : $.noop,
    mousemove  : $.noop,
    mouseup    : $.noop,
    
    mouseenter : $.noop,
    mouseover  : $.noop,
    mouseleave : $.noop,
    dblclick   : $.noop,
    
    onFrame : $.noop
  };
  
}