function(){
  hljs.initHighlightingOnLoad();
  /*
  $.each($('h1','#content-wrapper'),function(i,val){
    var $el = $(this);
    var content = '<a href="#">' + $el.text() + '</a>';
    if (i > 0) {
      content += '<div class="separator"></div>';
    }
    $('<li>').html(content).appendTo('.mainbar ul').click(function(){
      $menuItem = $(this)
      $('.selected').removeClass('selected');
      $menuItem.addClass('selected');
      $('.subbar ul').fadeOut('fast',function(){
        $(this).empty();
        $.each($('h2',$el.next('.article')),function(i,val){
          var $self = $(this)
          var content = '<a href="#">' + $self.text() + '</a>';
          if (i > 0) {
            content += '<div class="separator"></div>';
          }         
          var $subMenuItem = $('<li>').html(content).appendTo('.subbar ul').click(function(){
            $('.subbar li').removeClass('selected')
            $(this).addClass('selected');
            
            $('html,body').animate({scrollTop: $self.offset().top},'slow');
          })
        })
        $(this).fadeIn('fast');
      })
    })
  })*/
  var menu = [];
  var h1Count = 0;
  
  $('#content-wrapper').children().each(function(){
    if(this.tagName == 'H1') {
      var content = '<a href="#">' + $(this).text() + '</a>';
      if (h1Count > 0) {
        content += '<div class="separator"></div>';
      }
      var $menuEl = $('<li>').html(content).appendTo('.mainbar ul').data('menuindex',h1Count).click(function(){
        var $el = $(this);
        $('.selected').removeClass('selected');
        $el.addClass('selected');
        $('.subbar ul').fadeOut('fast',function(){
          $(this).empty();
          var menuItem = menu[$el.data('menuindex')]
          var submenus = menuItem.h2;
          if (submenus) {
            for(var i=0;i<submenus.length;i++) {
              var $submenu = $(submenus[i]);
              var content = '<a href="#">' + $submenu.text() + '</a>';
              if (i > 0) {
                content += '<div class="separator"></div>';
              }
              $('<li>').html(content).appendTo('.subbar ul').click(function(){
                $('.subbar li').removeClass('selected')
                $(this).addClass('selected');
              
                $('html,body').animate({scrollTop: $submenu.offset().top},'slow');
              })
            }
          } else {
            $('html,body').animate({scrollTop: $(menuItem.orih1).offset().top},'slow');
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