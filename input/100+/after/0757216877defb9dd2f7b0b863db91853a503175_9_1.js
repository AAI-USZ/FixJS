function(data){
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
  }