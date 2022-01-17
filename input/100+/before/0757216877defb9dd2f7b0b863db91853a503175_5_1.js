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
    data.preload.hide().css(css).html(data.preloadHtml || "");
    
    data.stage.hide().css({
      width    : w, 
      height   : h,
      top      : "0px", 
      left     : "0px",
      position : "absolute"
    });
  }