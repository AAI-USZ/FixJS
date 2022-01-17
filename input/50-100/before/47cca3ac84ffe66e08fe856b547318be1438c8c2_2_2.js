function() {
			if(!this.tagName)return void 0;

			var thisObj = this,
				cont = thisObj["_"] || (thisObj["_"] = {});//Положим S_ELEMENT_CACHED_CLASSLIST_NAME в контейнер "_";

			if(!cont[S_ELEMENT_CACHED_CLASSLIST_NAME])cont[S_ELEMENT_CACHED_CLASSLIST_NAME] = new DOMStringCollection(thisObj.className, DOMStringCollection_setNodeClassName, thisObj);

			return cont[S_ELEMENT_CACHED_CLASSLIST_NAME];
		}