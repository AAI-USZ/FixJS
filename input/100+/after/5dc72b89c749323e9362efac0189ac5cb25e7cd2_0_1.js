function (word) {

		var getElement = function (value) {
			var elementReg = RegExp("^([^\\.]*\\.)*")
			var element = elementReg.exec(value)[0];
			element = element.replace(/\.$/, "");
			return element;
		}

		var getRest = function (value) {

			var restReg = /\.?([^\.]*)$/
			var rest = restReg.exec(value)[0].replace(/\./, "");
			return rest;
		}

		var element = getElement(word);
		var rest = RegExp( "^" + getRest(word), "i");
		var nodes = [];
		var matches = [];
		var recObj = window;

		
		if ( element ){
			var restEle = element;
			while (restEle != ""){
				var ele = restEle.match(/^[^\.]*/)[0];
				recObj = recObj[ele];
				restEle = restEle.replace(/^[^\.]*\.?/, "");
			}
		}

		for ( var i in recObj ) {
			nodes.push(i);
		}

		for ( var i = 0; i < nodes.length; i++ ) {
			if ( nodes[i].match(rest) ){
				var dot = "";
				if ( element == "")
					dot = "";
				else
					dot = ".";
				matches.push(element + dot + nodes[i]);
			}
		}

		return matches;

	}