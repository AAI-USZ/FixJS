function(){
				var prClass,
					num;
				for(var i = 0; i<3; i++){
					prClass = '.priority'+i;
					num = 0;
					$.each($(eId).find(prClass), function(){
						num++;
					});
					counter[i] = num;
					redrawCounter(i);
				}
			}