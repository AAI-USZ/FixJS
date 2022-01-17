function( menu ){
      if( menu.data('swipePanel') ){
        menu.swipePanel('updateContainerWidth');
      } else {
				menu.swipePanel({
					container: menu.find('ul'),
					children: '> ul > li'
				});
      }
    }