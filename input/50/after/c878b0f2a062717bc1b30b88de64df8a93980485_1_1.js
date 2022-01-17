function( menu ){
      if( menu.data('swipePanel') ){
        menu.swipePanel('updateContainerSize');
      } else {
				menu.swipePanel({
					container: menu.find('ul'),
					children: '> ul > li'
				});
      }
    }