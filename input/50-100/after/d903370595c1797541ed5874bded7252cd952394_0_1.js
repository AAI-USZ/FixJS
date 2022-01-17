function(e){
			for(var j=0; j<top_nav_items.length; j++){
				if(top_nav_items[j].hasClass('active')){
					top_nav_items[j].removeClass('active');
				}
			}
			if(e.target.hasClass('nav_item')){
				e.target.addClass('active');
			}
			else{
				e.target.parentElement.addClass('active');
			}
		}