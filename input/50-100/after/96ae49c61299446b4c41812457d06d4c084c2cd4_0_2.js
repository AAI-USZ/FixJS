function(){
        if (jQuery(this).hasClass('toggle-open')){
          jQuery(this).parent('.block-slider').removeClass('toggle-open').addClass('toggle-close');
        }
        else{
          jQuery(this).parent('.block-slider').removeClass('toggle-close').addClass('toggle-open');
        }

      }