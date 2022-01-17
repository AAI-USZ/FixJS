function() {
		var c = this.findCollapsibleItem();
		if (c) {
			//apply movedClass is needed
			if(this.movedClass && this.movedClass.length>0 && !c.hasClass(this.movedClass)) {
				c.addClass(this.movedClass);
			}
			this.$.menu.addChild(c);
			var p = this.$.menu.hasNode();
			if (p && c.hasNode()) {
				c.insertNodeInParent(p);
			}
			return true;
		}
	}