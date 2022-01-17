function XPath(aPath)
	{
		//this.logInfo("XPath:"+aPath,1);
		var tmpPath = aPath;
		var result = new Array();

		if (tmpPath.substr(0, 1) == "/") {
			tmpPath = tmpPath.substr(1);
		}

		switch (tmpPath.substr(0,1)) {
		case "/" : // Find all elements by specified element name
			var allTag = exchWebService.commonFunctions.splitOnCharacter(tmpPath.substr(1), 0, ["/", "["]);
			if (!allTag) {
				allTag = tmpPath.substr(1);
			}

			this.logInfo(" @@ allTag="+allTag, 2);

			for (var index in this) {
				if ((index.indexOf(":") > -1) && (this[index].tagName != this.tagName)) {
					result.push(this[index]);
				}
			}
			tmpPath = "/"+tmpPath;
			break;

		case "@" : // Find attribute within this element
			this.logInfo("Attribute search:"+tmpPath+" in tag '"+this.tagName+"'", 2);
			if (this[tmpPath]) {
				this.logInfo("  --==--:"+this[tmpPath], 2);
				result.push(this[tmpPath]);
			}
			tmpPath = "";
			break;

		case "*" : // Wildcard. Will parse all children.
			tmpPath = tmpPath.substr(1);
			for (var index in this) {
				if ((index.indexOf(":") > -1) && (this[index].tagName != this.tagName)) {
					this.logInfo(" -- tag:"+index, 2);
					result.push(this[index]);
				}
			}
			break;

		case "[" : // Compare/match function
			this.logInfo("Requested XPath contains an index, attribute or compare request.", 2);

			var index = exchWebService.commonFunctions.splitOnCharacter(tmpPath.substr(1), 0, "]");
			if (!index) {
				throw "XPath error: Did not find closing square bracket"+this.tagName;
			}

			tmpPath = tmpPath.substr(index.length+2);
			this.logInfo("Condition: ["+index+"], tmpPath:"+tmpPath,2);

			index = this.trim(index); 

			if (index != "") {

				if (this.if(index)) {
					this.logInfo(" %%%%%%%%%%%%%% -------- MATCHFOUND ---------- %%%%%%%%%%%%%%", 2);
					result.push(this);
				}

			}
			else {
				this.logInfo("Nothing specified between the square brackets!!??",1);
				throw "XPath compare error:No Value between square brackets:"+this.tagName+"["+index+"]";
			}
			break;

		default:
			var bracketPos = tmpPath.indexOf("[");
			var forwardSlashPos = tmpPath.indexOf("/");
			var splitPos = tmpPath.length;
			if ((bracketPos < splitPos) && (bracketPos > -1)) {
				splitPos = bracketPos;
			}
			if ((forwardSlashPos < splitPos) && (forwardSlashPos > -1)) {
				splitPos = forwardSlashPos;
			}

			var tmpPath2 = tmpPath.substr(0, splitPos);
			tmpPath = tmpPath.substr(splitPos);

			if (tmpPath2 != "") {

				this.logInfo("We will check if specified element '"+tmpPath2+"' exists as child in '"+this.tagName+"'", 2);
				for (var index in this) {
					if (index.indexOf(":") > -1) {
						this.logInfo(" %%:"+index, 2);
						if (index == tmpPath2) {
							if (Array.isArray(this[index])) {
								this.logInfo(" ^^ found tag:"+index+" and is an array with "+this[index].length+" elements.", 2);
								for (var index2 in this[index]) {
									result.push(this[index][index2]);
								}
							}
							else {
								this.logInfo(" ^^ found tag:"+index, 2);
								result.push(this[index]);
							}
						}
					}
				}

			}

		} // End of switch

			this.logInfo("tmpPath:"+tmpPath+", result.length="+result.length,2);
		if ((result.length > 0) && (tmpPath != "")) {
			this.logInfo("tmpPath:"+tmpPath,2);
			var finalResult = new Array();
			for (var index in result) {

				if ((typeof result[index] === "string") || (result[index] instanceof String)) {
					finalResult.push(result[index]);
				}
				else {
					this.logInfo("~~a:"+result[index].tagName, 2);
					var tmpResult = result[index].XPath(tmpPath);
					if (tmpResult) {
						for (var index2 in tmpResult) {
							finalResult.push(tmpResult[index2]);
						}
					}
				}
			}
			result = finalResult;
		}
		else {
			if ((tmpPath != "") && (tmpPath.substr(0,2) != "//")) {
				var finalResult = new Array();
				this.logInfo("~~b:"+this.tagName, 2);
				var tmpResult = this.XPath(tmpPath);
				if (tmpResult) {
					for (var index2 in tmpResult) {
						finalResult.push(tmpResult[index2]);
					}
				}
				result = finalResult;
			}
		}

			this.logInfo("@@ tmpPath:"+tmpPath+", tag:"+this.tagName+", allTag:"+allTag+", result.length="+result.length,2);
		if ((tmpPath != "") && (tmpPath.substr(0,2) == "//") && (this[allTag]) && (this.tagName == this[allTag].tagName)) {
			this.logInfo(" !!:tag:"+this.tagName, 2);

			tmpPath = tmpPath.substr(1); // We remove one of double forward slash so it becomes a normal xpath and filtering will take place.
			if ((tmpPath != "") && (tmpPath.substr(0,2) != "//")) {
				var finalResult = new Array();
				this.logInfo("~~c:"+this.tagName, 2);
				var tmpResult = this.XPath(tmpPath);
				if (tmpResult) {
					for (var index2 in tmpResult) {
						finalResult.push(tmpResult[index2]);
					}
				}
				result = finalResult;
			}

//			result.push(this);
		}

		this.logInfo("XPath return.....",2);
		return result;
	}