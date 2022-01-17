function(self, menuTrigger) {
	step.menu.tickOneItemInMenuGroup(menuTrigger);

	//deal with events
	var menuItem = menuTrigger.menuItem;
	step.navigation.showBottomSection(menuItem);
	
	if(menuItem.name == "TIMELINE") {
		$.shout("show-timeline", { passageId : menuTrigger.passageId });
	} else if(menuTrigger.menuItem.name == "GEOGRAPHY") {
		$.shout("show-maps", { passageId : menuTrigger.passageId } );
	}
}