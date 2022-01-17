function __ielt8__element_init__() {
	var thisObj = this;
	if(thisObj["element"])thisObj = thisObj["element"];//¬_¬ only if the save `this` to local variable
	
	if(!("prepend" in thisObj)) {//DOM4 API
		thisObj["after"] = _Element_prototype["after"];
		thisObj["before"] = _Element_prototype["before"];
		thisObj["append"] = _Element_prototype["append"];
		thisObj["prepend"] = _Element_prototype["prepend"];
		thisObj["replace"] = _Element_prototype["replace"];
		thisObj["remove"] = _Element_prototype["remove"];
	}

	"isEqualNode" in thisObj || (thisObj.isEqualNode = _Node_prototype.isEqualNode);
	"compareDocumentPosition" in thisObj || (thisObj.compareDocumentPosition = _Node_prototype.compareDocumentPosition);
	"getElementsByClassName" in thisObj || (thisObj.getElementsByClassName = _Element_prototype.getElementsByClassName);

	"addEventListener" in thisObj || ((thisObj.addEventListener = global.addEventListener), 
									  (thisObj.removeEventListener = global.removeEventListener),
									  (thisObj.dispatchEvent = global.dispatchEvent));


	"querySelector" in thisObj || ((thisObj.querySelectorAll = _Element_prototype.querySelectorAll),
								   (thisObj.querySelector = _Element_prototype.querySelector));

	"matchesSelector" in thisObj || ((thisObj.matchesSelector = _matchesSelector), 
								     (thisObj["matches"] = _matchesSelector));
	
	"hasAttribute" in thisObj || (thisObj.hasAttribute = _Element_prototype.hasAttribute);

	//Unsafe (with "OBJECT" tag, for example) set's
	try {
		if(thisObj.cloneNode !== _Node_prototype.cloneNode) {
			thisObj["__nativeCloneNode__"] = thisObj.cloneNode;
			thisObj.cloneNode = _Node_prototype.cloneNode;
		}
		if(_Node_prototype.contains)thisObj.contains = _Node_prototype.contains;
	}
	catch(e) {
		//console.error(e.message)
		__ielt8__wontfix.push(thisObj);
	}
}