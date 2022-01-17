function(){
			var elem = this[0];
			if (!elem) return {};
			if(!elem.getBoundingClientRect){
				  var x_ = y_ = 0;
				  while(elem.offsetParent){
					  x_ += elem.offsetLeft;
					  y_ += elem.offsetTop;
					  elem = elem.offsetParent;
				  }
				  x_ += elem.offsetLeft;
				  y_ += elem.offsetTop;
				  return {left :x_,top :y_}
			  }else{
				  var body = document.compatMode == 'CSS1Compat' ? document.documentElement : document.body;
				  var rect = elem.getBoundingClientRect()
				  return {left :rect.left|0 + body.scrollLeft,top :rect.top|0 + body.scrollTop};
			  }
			}