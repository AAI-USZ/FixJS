function() {
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
    }