function() {
        $(img).attr('original-width', $(img).width());
        $(img).attr('original-height', $(img).height());
        
        //(img).css('max-width', '100%');
        $(img).css('max-width', '-moz-available');
      }