function() {
          var greyscale = $options.reverse ? 1 : 0;
          $(this).css({
            'filter': 'progid:DXImageTransform.Microsoft.BasicImage(grayscale=' + greyscale + ')'
          });
        }