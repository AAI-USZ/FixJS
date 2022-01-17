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
      }