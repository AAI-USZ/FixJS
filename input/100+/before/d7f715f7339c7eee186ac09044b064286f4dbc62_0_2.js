function(){
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
        }