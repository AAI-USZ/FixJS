function(context, settings) {
   
      // detect window size from value set by CSS
      // TODO This also needs to reun on resize action
      var size = window.getComputedStyle(document.body,':after').getPropertyValue('content');
/*
      $(window).resize(function(){
        var newsize = window.getComputedStyle(document.body,':after').getPropertyValue('content');
        alert('newsize = ' + newsize);
      });

      if(newsize) { size = newsize; } 
    
*/
      // alert('size = ' + size);
      if (size == 'phone') {

        // add an element-invisible class to the menu 
        $('#main-menu').addClass('hidden-menu');
        $('#navigation').addClass('phone-navigation');
        
        // add menu button id to the nav title
        $('#navigation h2').removeClass('element-invisible');
        $('#navigation h2').attr('id', 'menu-toggle');
        
        // set a toggle action on the nav title to hide and show the menu */
        
        $('#menu-toggle').bind('click', function(){
          $("#main-menu").toggleClass('hidden-menu');
        });
      }


    }