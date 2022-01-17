function(context, settings) {
   
      // detect window size from value set by CSS
      // with thanks to Matt Wilcox for the window.resize stuff
      // http://mattwilcox.net/archive/entry/id/1088/
      
      var current_size; // defaults to blank so it's always analysed on first load
      var did_resize  = true; // defaults to true so it's always analysed on first load
      var navigation_classes = $('#navigation').attr("class"); // store the default #navigation classes
      var raw_navigation = $("#navigation").html(); // grab the unaltered #navigation contents and store it for simpler resets on resize
     
      // on window resize, set the didResize to true
      $(window).resize(function() {
        did_resize = true;
      });
      
      // every 1/4 second, check if the browser was resized
      setInterval(function() {
        if(did_resize) {
          did_resize = false;

          var new_size = window.getComputedStyle(document.body,':after').getPropertyValue('content');
          /* tidy up after inconsistent browsers (some include quotation marks, they shouldn't) */
          new_size = new_size.replace(/"/g, "");
          new_size = new_size.replace(/'/g, "");
          
          // sweep clean before we make any changes
          // if the new breakpoint is different to the old one, do some stuff
          
          if (new_size != current_size) {
            
            // print this out somewhere we can see
            /*
$("#responsive-indicator .current-size").remove();
            $("#responsive-indicator").append("<div class='current-size'></div>");
            $(".current-size").html(current_size + ' / ' + new_size);
*/
        
            // remove the old #navigation content)
            $("#navigation .limiter").remove();

            // now re-insert clean mark-up
            $("#navigation").html(raw_navigation);

            // alert('size = ' + size);
            
            if (new_size === 'widescreen') {
            
            
            // set the current size
              current_size = new_size;
            }
            
            if (new_size === 'standard') {
            
            
            // set the current size
              current_size = new_size;
            }

            if (new_size === 'tablet') {
            
            
            // set the current size
              current_size = new_size;
            }

            
            
            if (new_size === 'phone') {
  
              // add an element-invisible class to the menu 
              $('#navigation').addClass('phone-navigation');
              $('#main-menu').addClass('hidden-menu');
              
              // add menu button id to the nav title
              $('#navigation h2').removeClass('element-invisible');
              $('#navigation h2').attr('id', 'menu-toggle');
              
              // set the current size
              current_size = new_size;
            }
            
            
          }
        }
      }, 250);
    }