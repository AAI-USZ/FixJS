function __ielt8__element_init__() {
	var thisObj = this;
	if(thisObj["element"])thisObj = thisObj["element"];//¬_¬ only if the save `this` to local variable
	
	if(!thisObj["after"])thisObj["after"] = _Element_prototype["after"];
	if(!thisObj["before"])thisObj["before"] = _Element_prototype["before"];
	if(!thisObj["append"])thisObj["append"] = _Element_prototype["append"];
	if(!thisObj["prepend"])thisObj["prepend"] = _Element_prototype["prepend"];
	if(!thisObj["replace"])thisObj["replace"] = _Element_prototype["replace"];
	if(!thisObj["remove"])thisObj["remove"] = _Element_prototype["remove"];

	if(!thisObj.isEqualNode)thisObj.isEqualNode = _Node_prototype.isEqualNode;
	if(!thisObj.compareDocumentPosition)thisObj.compareDocumentPosition = _Node_prototype.compareDocumentPosition;
	if(!thisObj.getElementsByClassName)thisObj.getElementsByClassName = _Element_prototype.getElementsByClassName;
	/*@requared: window.addEventListener, window.removeEventListener, window.dispatchEvent */
	if(!thisObj.addEventListener)thisObj.addEventListener = window.addEventListener;
	if(!thisObj.removeEventListener)thisObj.removeEventListener = window.removeEventListener;
	if(!thisObj.dispatchEvent)thisObj.dispatchEvent = window.dispatchEvent;


	if(!thisObj.querySelectorAll)thisObj.querySelectorAll = queryManySelector;
	if(!thisObj.querySelector)thisObj.querySelector = queryOneManySelector;
	if(!thisObj.matchesSelector)thisObj.matchesSelector = _matchesSelector;
	
	if(!thisObj.hasAttribute)thisObj.hasAttribute = _Element_prototype.hasAttribute;

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
	}
	if(thisObj.cloneNode !== _Node_prototype.cloneNode)__ielt8__wontfix.push(thisObj);
}