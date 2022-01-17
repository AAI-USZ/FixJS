function( menu ){
      if( menu.data('scrollPanel') ){
        console.log('---- update', menu.data('scrollPanel'));
        menu.scrollPanel('updateContainerWidth');
      } else {
        console.log('---- add');
        menu.scrollPanel({
          children  : '> ul > li'
        });
      }
    }