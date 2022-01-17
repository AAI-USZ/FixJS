function () {
    /* stop breaking the fucking tables with your stupid images yall */

    // thanks to Paolo Bergantino, Nick Craver & Andrew Ramdsen
    // http://stackoverflow.com/questions/965816/what-jquery-selector-excludes-items-with-a-parent-that-matches-a-given-selector/965962#965962
    // http://stackoverflow.com/questions/3877027/jquery-callback-on-image-load-even-when-the-image-is-cached
    // http://irama.org/news/2011/06/05/cached-images-have-no-width-or-height-in-webkit-e-g-chrome-or-safari/

    self.port.emit("log", "Unbreak Tables started");
    
    jQuery.expr[':'].parents = function(a,i,m){
      return jQuery(a).parents(m[3]).length < 1;
    };

    // Create an off-screen image to get the dimensions from
    var offImg = new Image();
    
    $(".postbody img.img, .attachment img").one('load', function() {
      var img = this;
      self.port.emit("log", "Image processing started");
      setTimeout(function() {
        // Set the off-screen image to use the current source
        self.port.emit("log", "Image sizing starting");
        offImg.src = $(img).attr("src");
        self.port.emit("log", "Offscreen image re-sourced");
        $(img).attr('original-width', offImg.width);
        $(img).attr('original-height', offImg.height);
        self.port.emit("log", "Image sizing completed");
        
        if ($(img).width() < $(img).attr('original-width')) {
          $(img).filter(":parents(a)")
            .after("<div style='font-size:10px; font-style:italic'>" + $(img).attr('original-width') + "x" + $(img).attr('original-height') + " image automatically resized - click for big</div>")
            .wrap("<a href='" + $(img).attr("src") + "' target='_blank' />")
            .css("border", "2px yellow solid");
        }
      }, 0);
    }).each(function() {
      if(this.complete) $(this).load();
    });
  }