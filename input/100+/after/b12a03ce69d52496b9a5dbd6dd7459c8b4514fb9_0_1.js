function($submenu){
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
              }