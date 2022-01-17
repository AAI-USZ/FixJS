function() {
			if (self.user.is("admin")) {
				dom.get("modeSwitch").hide();
			}
			switchClasses("remove");
		}