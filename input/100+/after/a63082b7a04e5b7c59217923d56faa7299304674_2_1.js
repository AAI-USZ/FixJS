function(view){
        if(!view){
          return;
        }
        if (0 === $(uiView + '[data-name=' + view + ']').length) {
          location.hash = '#/' + defaultView;
          return;
        }
        $(uiView + '[data-name=' + view + ']').show();
        $(uiTab + '.js-' + view).addClass('selected');
      }