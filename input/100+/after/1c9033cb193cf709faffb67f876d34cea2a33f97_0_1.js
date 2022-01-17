function _init() {
            // Prepend image, wrapped in a DIV, with some positioning and zIndex voodoo
            if(src) {
                var img;

                // If this is the first time that backstretch is being called
                if($container.length == 0) {
                    $container = $("<div />").attr("id", "backstretch")
                                             .css({left: 0, top: 0, overflow: "hidden", zIndex: -999999, margin: 0, padding: 0, height: "100%", width: "100%"});
                } else {
                    // Prepare to delete any old images
                    $container.find("img").addClass("deleteable");
                }

                img = $("<img />").css({position: "absolute", display: "none", margin: 0, padding: 0, border: "none", zIndex: -999999, maxWidth: "none"})
                                  .bind("load", function(e) {
                                      var $self = $(this),
                                          imgWidth, imgHeight;

                                      $self.css({width: "auto", height: "auto"});
                                      imgWidth = this.width || $(e.target).width();
                                      imgHeight = this.height || $(e.target).height();
                                      imgRatio = imgWidth / imgHeight;

                                      _adjustBG();
                                      $self.fadeIn(settings.speed, function(){
                                          // Remove the old images, if necessary.
                                          $container.find('.deleteable').remove();
                                          // Callback
                                          if(typeof callback == "function") callback();
                                      });
                                  })
                                  .appendTo($container);

                // Append the container to the body, if it's not already there
                if($("body #backstretch").length == 0) {
                    /*
                     * Scroll the page one pixel to get the right window height on iOS
                     * Pretty harmless for everyone else
                    */
                    if ($(window).scrollTop() === 0 ) window.scrollTo(0, 0);
                    $("#wrapper").append($container);
                }

                // Attach the settings
                $container.data("settings", settings);

                img.attr("src", src); // Hack for IE img onload event

                // Adjust the background size when the window is resized or orientation has changed (iOS)
                $(window).unbind("resize.backstretch").bind("resize.backstretch", function() {
                  // Need to do this in order to get the right window height
                  if("onorientationchange" in window) {
                    if (window.pageYOffset === 0) window.scrollTo(0, 1);
                  }
                  _adjustBG()
                });
            }
        }