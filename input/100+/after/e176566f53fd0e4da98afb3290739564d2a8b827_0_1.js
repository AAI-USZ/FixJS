function(){
        var greyscale = $options.reverse ? 0 : 1;
        $(this).css({
          'filter': 'progid:DXImageTransform.Microsoft.BasicImage(grayscale=' + greyscale + ')',
          'zoom': '1'
        });
        $(this).hover(function() {
          var greyscale = $options.reverse ? 1 : 0;
          $(this).css({
            'filter': 'progid:DXImageTransform.Microsoft.BasicImage(grayscale=' + greyscale + ')'
          });
        }, function() {
          var greyscale = $options.reverse ? 0 : 1;
          $(this).css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(grayscale=' + greyscale + ')');
        });
      }