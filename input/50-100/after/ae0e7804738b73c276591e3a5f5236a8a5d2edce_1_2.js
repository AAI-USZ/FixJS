function( menu ){
      if( menu.data('swipePanel') ){
        menu.swipePanel('updateContainerWidth');
      } else {
				setTimeout( function(){
					menu.swipePanel({
						container: menu.find('ul')
					});
				}, 1000);
      }
    }