function(/*Array*/values){
			// summary:
			//		Sets the current date as an array of values.
			// description:
			//		This method takes an array that consists of three values,
			//		year, month, and day. If the values are integer, they are
			//		formatted to locale-specific strings before setting them to
			//		the slots. Month starts from 1 to 12 (Ex. 1 - Jan, 2 - Feb, etc.)
			//		If the values are NOT integer, they are directly
			//		passed to the setter of the slots without formatting.
			//
			// example:
			//	|	set("values", [2012, 1, 20]); // January 20, 2012
			// tags:
			//		private
			array.forEach(this.getSlots(), function(w, i){
				var v = values[i];
				if(typeof v == "number"){
					var arr = [1970, 1, 1];
					arr.splice(i, 1, v - 0);
					v = w.format(new Date(arr[0], arr[1] - 1, arr[2]));
				}
				w.set("value", v);
			});
		}