function(){
		var target = $('#main-menu ul li.active-trail');
		
		if($('#main-menu ul li.active-trail').exists()){
			if($('#main-menu ul li.active-trail li.active-trail').exists()){
				$('#main-menu').scrollTo( target, 0 );
			}else{
				$('#main-menu').scrollTo( target, 800, {easing:'linear'} );
			}
		}
	}