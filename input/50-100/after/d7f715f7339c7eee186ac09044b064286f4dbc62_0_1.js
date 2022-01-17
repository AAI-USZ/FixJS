function(event){
                  event.preventDefault();
                  $('.subbar li').removeClass('selected')
                  $(this).addClass('selected');
                
                  $('html,body').animate({scrollTop: $submenu.offset().top-menuHeight-20},'slow');
                }