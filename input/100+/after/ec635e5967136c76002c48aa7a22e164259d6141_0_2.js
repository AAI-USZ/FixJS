function(window, undefined){

	loadSheets(); //start the chain

	var rules = ''; //initialize the rules variable in this scope so it can be used later

	function loadSheets(){

		var links = [];

		var sheets = document.getElementsByTagName('link'); //search for link tags

		for(var i = 0; i<sheets.length; i++){

			if(sheets[i].rel === "stylesheet/mathematicss"){ //we'll only process stylesheets with this rel value

				links[i] = sheets[i].href;

				if(i == sheets.length-1){

					xhr(links[i], matchcss, true);

				} else {

					xhr(links[i], matchcss, false);

				}

			}

		}

	}

	

	function matchcss(response, exit){ //collect all of the rules from the xhr response texts and match them to a pattern

		rules = rules+response.responseText;

		if(exit){ //send rules to pattern matching function if exit condition is received

			var pattern =/:[\-\#]*.*(?:math\().*\).*/g;

			var found = rules.match(pattern);

			parens(found);

		}

	}



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

					if((depth == 0 && current.substr(j-4,4))==='math'||depth >0){//allow for depth to increase only if we are inside of a 'math' section of if the depth is already >0 (ie we are inside a math section)

						depth++;

						parens[i][j] = depth; //relates character location to depth change. comes after depth++

					}

				}else if(current.charAt(j) == ')'){

					if(depth>0){

						parens[i][j]= depth; //relates character location to depth change. comes before depth--

						depth--;

					}

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



	function findparens(current){ //same as parens but only runs on one rule and does not create contaminated array

		var parens = new Array(current.length); //array with parens locations

		var depth = 0;

		for(var i = 0; i<current.length; i++){

			parens[i] = 0;

			if(current.charAt(i) == '('){

				if((depth == 0 && current.substr(i-4,4)==='math')||depth >0){ //allow for depth to increase only if we are inside of a 'math' section of if the depth is already >0 (ie we are inside a math section)

					depth++;

					parens[i] = depth; //relates character location to depth change. comes after depth++

				}

			}else if(current.charAt(i) == ')' && depth >0){

				parens[i]= depth; //relates character location to depth change. comes before depth--

				depth--;		

			}

		}

		return parens;

	}



	function nest(found, contaminated, parens){

		var css = [];

		var j = 0;

		var k = 0;

		for(var i = 0; i<found.length; i++){

			if(found[i] !== contaminated[i]){ //don't waste time parsing bad rules

				css[i] = found[i]; //set working variable

				while(Math.max.apply(Math, findparens(css[i]))>0){

					j = maxIndex(parens[i]);

					k = maxIndex(parens[i].slice(j+1,parens[i].length))+j+1;

					css[i] = parseit(css[i], j, k);

					parens[i] = findparens(css[i]);

				}

			}

		}

		loadcss(found, css);

	}



	function parseit(current, j, k){ //replace each set of parentheses with evaluated content

		var chunk = k-j>1 ? eval(current.substr(j+1, k-j-1)) : ''; //js takes a long time to evaluate the zero length substring so we use the ternary operator to avoid it

		var before = current.substr(0,j);

		var after = current.substr(k+1);

		if(before.substr(j-3) === 'log'){

			chunk = Math.log(chunk);

			before = before.substr(0,j-3);

			if(before.substr(j-4) === ')'|| !isNaN(before.substr(j-4))){

				before = before + '*';

			}

			else if(before.substr(j-4) === '-'){

				before = before + '1*';

			}

		}

		else if(before.substr(j-3) === 'pow'){

			chunk = current.substr(j+1, k-j-1);

			chunk1 = chunk.match(/^[0-9]+/);

			chunk2 = chunk.match(/[0-9]+$/);

			chunk = Math.pow(chunk1,chunk2);

			before = before.substr(0,j-3);

			if(before.substr(j-4) === ')'|| !isNaN(before.substr(j-4))){

				before = before + '*';

			}

		}

		else if(before.substr(j-3) === 'exp'){

			chunk = Math.exp(chunk);

			before = before.substr(0,j-3);

			if(before.substr(j-4) === ')'|| !isNaN(before.substr(j-4))){

				before = before + '*';

			}

		}

		else if(before.substr(j-2) === 'pi'){

			chunk = Math.PI;

			before = before.substr(0,j-2);

			if(before.substr(j-3) === ')'|| !isNaN(before.substr(j-3))){

				before = before + '*';

			}

		}

		else if(before.substr(j-4) === 'sqrt'){

			chunk = Math.sqrt(chunk);

			before = before.substr(0,j-4);

			if(before.substr(j-5) === ')'|| !isNaN(before.substr(j-5))){

				before = before + '*';

			}

		}

		else if(before.substr(j-4) === 'math'){

			before = before.substr(0,j-4);

			if(before[before.length-1] === '-' && chunk<0){

				before = before.substr(0,before.length-1);

				chunk = chunk.toString().substr(1);

			}

		}

		else if(!isNaN(before.substr(j-1))){

			before = before + '*';

		}

		else if(before.substr(j-1) === '-'){

			before = before + '1*';

		}

		if(!isNaN(after.substr(0,1)) && after.substr(0,1) !== ' '){ //if character after the parentheses is a number and not a space

			after = '*'+after;

		}

		return before + chunk + after;

	}



	function maxIndex(arr){ //this function helps us determine the index of the most nested set of parentheses

		if(arr.length == 0){

			return 0;

		}

		var maxIndex = 0;

		for(var i = 0; i<arr.length; i++){

			if(arr[i]>arr[maxIndex]){

				maxIndex = i;

			}

		}

		return maxIndex

	}



	function loadcss(found, css){ //replace and load the new rules

		for(var i = 0; i<css.length; i++){ //only run this loop as many times as css has entries

			if(css[i]){

				rules = rules.replace(found[i],css[i]); //replace old rules with our processed rules

			}

		}

		var mathematicss = document.createElement('style');

		mathematicss.setAttribute('type', 'text/css');

		mathematicss.id='mathematicss';

		mathematicss.innerHTML = rules;

		document.getElementsByTagName('head')[0].appendChild(mathematicss);	//create the new element

	}



	function xhr(url, callback, exit){ //create new XMLHttpRequest object and run it

		var xhr = getXMLHttpRequest();

		xhr.open('GET', url, true);

		xhr.send();

		xhr.onreadystatechange = function(){

			if (xhr.readyState == 4){

				callback(xhr, exit);

			} else { //callback function on AJAX error



			}

		};

	}



	function getXMLHttpRequest(){ //we're gonna check if our browser will let us use AJAX

		if(window.XMLHttpRequest){

			return new XMLHttpRequest();

		}

	}

}