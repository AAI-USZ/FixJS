function(inSender, inEvent) {
		var sp = this.$.samplePanels;
		var p = this.panelArrangers[inEvent.originator.indexInContainer()];
		if (this.currentClass) {
			sp.removeClass(this.currentClass)
		}
		if (p.classes) {
			sp.addClass(p.classes);
			this.currentClass = p.classes;
		}
		sp.setArrangerKind(p.arrangerKind);
		if (enyo.Panels.isScreenNarrow()) {
			this.setIndex(1);
		}
	}