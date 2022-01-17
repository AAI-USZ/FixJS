function(key ){
			var elem = this.stack[0];
			if (key)  return elem ? null : elem[ {'width':'offsetWidth' , 'height':'offsetHeight'}[key] ];
			if (!elem ) return {};	
			var ret = {
				'left' : elem.offsetLeft,
				'top' :  elem.offsetTop
				}
			return ret;
			
			}