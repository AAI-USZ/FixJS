function (cslData, lastCslId, macroLink) {
		var index,
			children = [],
			cslNodes = [],
			thisCslData,
			macro;

		if (typeof cslData.cslId === "undefined") {
			cslData.cslId = -1;
		}
		cslData.children = cslData.children || [];

		if (cslData.cslId > lastCslId[0]) {
			lastCslId[0] = cslData.cslId;
		}

		if (!pathContainsLeafNode(cslData.name)) {
			for (index = 0; index < cslData.children.length; index++) {
				children.push(jsTreeDataFromCslData_inner(
					cslData.children[index], lastCslId, macroLink));
			}
		}

		var jsTreeData = {
			data : CSLEDIT.uiConfig.displayNameFromNode(cslData),
			attr : {
				rel : cslData.name,
				cslid : cslData.cslId
			},
			children : children
		};

		if (typeof macroLink !== "undefined") {
			jsTreeData.attr.macrolink = macroLink;
		}

		if (enableMacroLinks) {
			// Add 'symlink' to Macro
			macro = new CSLEDIT.CslNode(cslData).getAttr("macro");
			if (cslData.name === "text" && macro !== "") {
				addMacro(jsTreeData, cslData, macro);
			}
		}

		return jsTreeData;
	}