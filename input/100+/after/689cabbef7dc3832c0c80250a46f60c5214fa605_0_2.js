function(exp,num,unit){
						old[ind] = old[ind] || "0";
						var finalvalue = Number(old[ind]) + ( Number(num) - Number(old[ind]) ) * p;							
						ind++;
						return finalvalue + unit;
					}