function(passageId, menuName) {
	    return this.getSelectedOptions($("li[menu-name=" + menuName + "]", step.util.getPassageContainer(passageId)));
	}