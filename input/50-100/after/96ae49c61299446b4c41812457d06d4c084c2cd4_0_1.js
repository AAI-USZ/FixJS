function(index, value){
          event.preventDefault();
          jQuery(this).siblings('.block-content, .view').slideToggle('slow', function(){
            var parent = jQuery(this).parent('.block-slider');
            if (parent.hasClass('toggle-open')){
              parent.removeClass('toggle-open').addClass('toggle-close');
            }
            else{
              parent.removeClass('toggle-close').addClass('toggle-open');
            }
          });
        }