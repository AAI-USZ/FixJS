function(el, ev){
		clearTimeout(this.searchTimer);
		if((el.val() == "" && typeof $.route.attr('who') == 'undefined') || ev.keyCode == 27){
			$.route.attrs({ who : "index"}, true);
		} else if(el.val() != ""){
			this.searchTimer = setTimeout(this.proxy('search'),200)
		}
	}