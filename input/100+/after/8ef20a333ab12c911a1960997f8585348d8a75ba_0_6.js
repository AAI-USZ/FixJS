function reinitializeElement(elementObject) {
			if (elementObject.hasClass("mods_element"))
				elementObject.tabs();
			elementObject.find(".mods_element").each(function(){
				$(this).tabs();
			});
		}