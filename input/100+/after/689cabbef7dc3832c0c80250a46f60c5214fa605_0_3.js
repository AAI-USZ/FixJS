function( i,el ){
			 	var props = nodecss[ i ];
				$.each(props,function(key,val){
					var ind = 0,
						//@old store the olds values in an array
						old = val[0].match( digits );
					el.style[key] = val[1].replace(rCssValue,function(exp,num,unit){
						old[ind] = old[ind] || "0";
						var finalvalue = Number(old[ind]) + ( Number(num) - Number(old[ind]) ) * p;							
						ind++;
						return finalvalue + unit;
					});
				});
			}