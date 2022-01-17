function(eltSetSize, start){
			var cur, max = eltSetSize;
			if(start === undefined){
				start = 0;
			}
			start = imageFun.fxCore.mod(start,eltSetSize);
			var countingFn = function(){
				var retVal = cur;
				cur = (cur+1)%max;
				return retVal;
			};
			this.count = countingFn;
		}