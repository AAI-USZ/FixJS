function(options){
    // Default settings
    var settings = {
      // dimensions
      width             : undefined,              // Window width (or frame width)
      height            : undefined,              // Window height (or frame height)
      //offsetX           : 0,                      // Offset in X direction from the left image border to the first frames left border
      //offsetY           : 0,                      // Offset in Y direction from the top image border to the first frames top border
      //frameStepX        : undefined,              // Distance in X direction to the next frame if it differs from window width 
      //frameStepY        : undefined,              // Distance in Y direction to the next frame if it differs from window height
      //frameStep         : undefined,              // Width of a single frame or step to the next frame
      //framesX           : undefined,              // Number of frames in a single row
      frames            : 36,                     // Total number of frames
      frame             : 0,                      // Initial frame number
      //resolutionX       : undefined,              // The spritesheet resolution in X direction
      //resolutionY       : undefined,              // The spritesheet resolution in Y direction
      
      // animation & update
      animate           : true,                   // Run animation when after initialize
      loop              : false,                  // Repeat animation in a loop
      loopFrame         : 0,                      // Indicates the loop start frame
      frameTime         : 36,                     // Time between updates
      reverse           : false,                  // If true animation is played backward
      sense             : 1,                      // Interaction sensitivity used by behavior implementations
      orientation       : "horizontal",
      
      // interaction
      //behavior          : "drag",                 // Enables mouse interaction
      
      // appearance               
      image             : undefined,              // Stiched source image
      preloadHtml       : " ",                    // Html to appear when images are preloaded
      preloadBackground : undefined,              // Background image to display on load
      preloadCSS        : undefined,
			fadeFrames        : 0,                      // Enables and disables smooth transitions between frames
			fadeInTime        : 0,                      // 
			fadeOutTime       : 120,                    // 
      
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
          settings.image = [];
          for(i = 0; i < images.length; i += 1){
            settings.image.push($(images[i]).attr("src"));
          }
        }
        
        // disable selection & hide overflow
        $this.attr("unselectable", "on").css({ 
          overflow : "hidden", 
          position : "relative"
        }).html("");
        
        // build inner html
        $this.html("");
        $this.append($("<div class='spritespin-stage'/>"));
        $this.append($("<div class='spritespin-preload'/>"));
                
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

        if (options.image){
          // when images are passed, need to reload the plugin
          SpriteSpin.reload(data);
        } else {
          // otherwise just reanimate spritespin
          $this.spritespin("animate", data.animate, data.loop);
        }
      }
    });
  }