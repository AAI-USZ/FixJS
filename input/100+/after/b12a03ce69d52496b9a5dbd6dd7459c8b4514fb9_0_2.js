function(){
  hljs.initHighlightingOnLoad();
  
  /* Make menu bar to stay on top when the page scrolldowns */
  var isAbsolute = true;
  var $menuBar = $('#menu');
  $(window).scroll(function(e,v){
    var scrollTop = $(this).scrollTop() > 350;
    if (isAbsolute && scrollTop ) {
      $menuBar.css({position:'fixed',top:'0px'});
      isAbsolute = false;
    } else if (!isAbsolute && !scrollTop){
      isAbsolute = true;
      $menuBar.css({position:'absolute',top:'auto'});
    }
  })
  
  var menu = [];
  var h1Count = 0;
  var menuHeight = $menuBar.height();
  $('#content-wrapper').children().each(function(){
    if(this.tagName == 'H1') {
      var content = '<a href="#">' + $(this).text() + '</a>';
      if (h1Count > 0) {
        content += '<div class="separator"></div>';
      }
      var $menuEl = $('<li>').html(content).appendTo('.mainbar ul').data('menuindex',h1Count).click(function(event){
        event.preventDefault();
        var $el = $(this);
        $('.selected').removeClass('selected');
        $el.addClass('selected');
        $('.subbar ul').fadeOut('fast',function(){
          $(this).empty();
          var menuItem = menu[$el.data('menuindex')]
          var submenus = menuItem.h2;
          if (submenus) {
            for(var i=0;i<submenus.length;i++) {
              (function($submenu){
                var content = '<a href="#">' + $submenu.text() + '</a>';
                if (i > 0) {
                  content += '<div class="separator"></div>';
                }
                $('<li>').html(content).appendTo('.subbar ul').click(function(event){
                  event.preventDefault();
                  $('.subbar li').removeClass('selected')
                  $(this).addClass('selected');
                
                  $('body').animate({scrollTop: $submenu.offset().top-menuHeight-20},'slow');
                })
              })($(submenus[i]));
            }
          } else {
            $('body').animate({scrollTop: $(menuItem.orih1).offset().top-menuHeight},'slow');
          }
          $(this).fadeIn('fast');
        })
      })
      
      menu.push({h1:$menuEl,orih1:this})
      h1Count++;
    }
    if(this.tagName == 'H2')  {
      if( !menu[h1Count-1].h2 ) {
        menu[h1Count-1].h2 = [];
      }
      menu[h1Count-1].h2.push(this);
    }

  })
}