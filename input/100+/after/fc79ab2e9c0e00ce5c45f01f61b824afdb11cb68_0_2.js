function (nodeXml, nodeObj) {
	var attrObj = $(nodeXml).get(0).attributes;
	var nodeType = nodeObj["_type"];
	var attrs = Parser.nclStructureMap[nodeType].attrs;
	var foundAttrs = [];
	for (var i=0; i<attrObj.length; i++) {
		foundAttrs.push(attrObj.item(i).name);
	}
	// # (source)
	for (i in attrs.reference_source) {
		for (attr in attrs.reference_source[i][0]) {
			if ($(nodeXml).attr(attrs.reference_source[i][0][attr])) {
				this.referenceMap.addSource(nodeObj,attrs.reference_source[i][0][attr],attrs.reference_source[i][1]);
			}
		}
	}
	// # (target)
	for (attr in attrs.reference_target) {
		if ($(nodeXml).attr(attrs.reference_target[attr])) {
			var type = attrs.reference_target[attr]=="focusIndex" ? "focusIndex" : nodeType;
			if (!this.referenceMap.addTarget(nodeObj,$(nodeXml).attr(attrs.reference_target[attr]),$(nodeXml).parent().attr("id"),type)) {
				Debugger.error(Debugger.ERR_DUPLICATED_ID,nodeType,[attrs.reference_target[attr],$(nodeXml).attr(attrs.reference_target[attr]),$(nodeXml).parent().attr("id")]);
			}
		}
	}
	// !
	for (attr in attrs.required) {
		var index = $.inArray(attrs.required[attr],foundAttrs); 
		if (index == -1) {
			Debugger.error(Debugger.ERR_MISSING_ATTR,nodeType,[attrs.required[attr]]);
		} else {
			foundAttrs[index] = 0;
			while (index = $.inArray(attrs.required[attr],foundAttrs) != -1) {
				Debugger.error(Debugger.ERR_TOO_MANY_ATTRS,nodeType,[attrs.required[attr]]);
				foundAttrs[index] = 0;
			}
		}
	}
	// ?
	for (attr in attrs.optional) {
		var index = $.inArray(attrs.optional[attr],foundAttrs); 
		if (index != -1) {
			foundAttrs[index] = 0;
			while (index = $.inArray(attrs.optional[attr],foundAttrs) != -1) {
				Debugger.error(Debugger.ERR_TOO_MANY_ATTRS,nodeType,[attrs.required[attr]]);
				foundAttrs[index] = 0;
			}
		}
	}
	// !1
	var oneFound = attrs.oneOf.length==0;
	for (attr in attrs.oneOf) {
		var index = $.inArray(attrs.oneOf[attr],foundAttrs);
		if (index != -1) {
			oneFound = true;
			foundAttrs[index] = 0;
			while (index = $.inArray(attrs.oneOf[attr],foundAttrs) != -1) {
				Debugger.error(Debugger.ERR_TOO_MANY_ATTRS,nodeType,[attrs.oneOf[attr]]);
				foundAttrs[index] = 0;
			}
		}
	}
	if (!oneFound) {
		Debugger.error(Debugger.ERR_MISSING_ATTR_ONEOF,nodeType,attrs.oneOf);
	}
	// Atributos inválidos
	for (attr in foundAttrs) {
		if (foundAttrs[attr] != 0) {
			Debugger.warning(Debugger.WARN_INVALID_ATTR,nodeType,[foundAttrs[attr]]);
		}
	}
}