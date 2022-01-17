function(min, max, number) {
	if(typeof number === "undefined" && typeof min !== "object") {
		if(arguments.length == 1) {
			min = 0, max = arguments[0];
		}else if(arguments.length == 2) {
			min = arguments[0];
			max = arguments[1];
		}else{
			min = 0;
			max = 100;
		}

		var diff = max - min;
		var r = Math.random();
		var rr = diff * r;
		var rrr = Math.round(rr);
	
		return min + rrr;
	}else{
		var output = [];
		if(typeof number === "undefined") {
			number = max || min.length;
		}
		for(var i = 0; i < number; i++) {
			var num;
			if(typeof arguments[0] === "object") {
				num = arguments[0][randomi(0, arguments[0].length - 1)];
			}else{
				num = randomi(min, max);
			}
			output.push(num);
		}

		return output;
	}
}