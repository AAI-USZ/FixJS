function() {
        if(did_resize) {
          did_resize = false;

          var new_size = window.getComputedStyle(document.body,':after').getPropertyValue('content');
          /* tidy up after inconsistent browsers (some include quotation marks, they shouldn't) */
          new_size = new_size.replace(/"/g, "");
          new_size = new_size.replace(/'/g, "");
          
          // sweep clean before we make any changes
          // if the new breakpoint is different to the old one, do some stuff
          
          if (new_size != current_size) {
            // alert('new size does not equal the current stored size');                   
            // replace #navigation content)
            $("#navigation .limiter").remove();
            $("#navigation").html(raw_navigation);
            
            if (new_size === 'widescreen') {}
            
            if (new_size === 'standard') {}

            if (new_size === 'tablet') {}
            
            if (new_size === 'phone') {
              // add an element-invisible class to the menu 
              $('#navigation .limiter').addClass('phone-navigation');
              $('#main-menu').addClass('hidden-menu');              
              // add menu button id to the nav title
              $('#navigation h2.menu-title').removeClass('element-invisible');
              $('#navigation h2.menu-title').attr('id', 'menu-toggle');
              // set a toggle action on the nav title to hide and show the menu */
              $('#menu-toggle').bind('click', function(){
                $("#main-menu").toggleClass('hidden-menu');
              });
            }
            
            current_size = new_size;
            // if we're in development mode, print this out somewhere we can see
            if(dev_mode == 1) {
            if ($("#responsive-indicator").length) {
            $("#responsive-indicator .current-size").remove();
            $("#responsive-indicator").append("<div class='current-size'></div>");
            $(".current-size").html('script: ' + current_size + ' / css: ' + new_size);
            }}
          }
        }
      }