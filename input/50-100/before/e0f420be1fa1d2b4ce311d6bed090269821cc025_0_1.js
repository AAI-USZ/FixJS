function(x) {
            var chars = [], c;
            for(c = 0; c < x.length; c++) {
                chars.push(new Char(x[c]));
            }
        	return new List(chars);
        }