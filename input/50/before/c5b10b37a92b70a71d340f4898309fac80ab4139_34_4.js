function(json){
					console.log('wrote object to apf')
					++count;
					writer(json);
					return count;
				}