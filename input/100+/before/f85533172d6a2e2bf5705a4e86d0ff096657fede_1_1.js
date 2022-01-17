function (params,node,dijitWidget,metadata,srcElement) {
		if (dojo.isString(dijitWidget)) {
			dojo.attr(node, "dojoType", dijitWidget);
			if(srcElement) {
				srcElement.addAttribute("dojoType", dijitWidget);
			}
		}
	}