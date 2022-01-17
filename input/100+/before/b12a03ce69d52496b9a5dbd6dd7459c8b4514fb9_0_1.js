function(){
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
        }