function() {
			if (self.user.is("admin")) {
				dom.get("modeSwitch").show();
			}
			switchClasses("add");
		}