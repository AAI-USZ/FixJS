function(context, settings) {
   
      // detect window size from value set by CSS
      // with thanks to Matt Wilcox for the window.resize stuff
      // http://mattwilcox.net/archive/entry/id/1088/
      
      var dev_mode = Drupal.settings.mcbase.dev_mode;
      // alert('dev_mode = ' + dev_mode);
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
      }, 250);
    }