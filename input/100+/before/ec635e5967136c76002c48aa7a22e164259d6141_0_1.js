function parens(found){ //locate and check for properly nested parentheses in css rules

		var current = ''; //initialize working variable

		var contaminated = new Array(found.length); //array of css rules with errors 

		var parens = new Array(found.length); //array with parens locations

		for(var i = 0; i<found.length; i++){ //iterate for every mathematicss rule

			current = found[i]; //set working variable

			parens[i] = new Array(current.length);

			var depth = 0;

			for(var j = 0; j<current.length; j++){

				parens[i][j] = 0;

				if(current.charAt(j) == '('){

					depth++;

					parens[i][j] = depth; //relates character location to depth change. comes after depth++

				}else if(current.charAt(j) == ')'){

					parens[i][j]= depth; //relates character location to depth change. comes before depth--

					depth--;

					if(depth<0){

						contaminated[i] = current; //add rule to contaminated array if improper nesting is found

					}

				}

				if(j == current.length-1 && depth != 0){

					contaminated[i] = current; //add rule to contaminated array if improper nesting is found

				}

			}

		}

		nest(found, contaminated, parens);

	}