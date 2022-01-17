function(element) {
	var self = this;
	var label = this.config.get("streamStateLabel");
	if ((!label.icon && !label.text) || !this.config.get("liveUpdates")) {
		return element;
	}

	var activitiesCount = 0;
	if (this.activities.state === "paused") {
		activitiesCount = Echo.Utils.foldl(0, this.activities.queue, function(entry, acc) {
			if (entry.affectCounter) {
				return ++acc;
			}
		});
	}
	var currentState = this.activities.state + activitiesCount;
	if (currentState === this.activities.lastState) {
		return element;
	}

	element = (element || this.dom.get("state")).empty();
	if (!this.activities.lastState && this.config.get("streamStateToggleBy") === "button") {
		element.addClass("echo-linkColor echo-clickable").click(function() {
			self.setStreamState(self.activities.state === "paused" ? "live" : "paused");
		});
	}
	var templates = {
		"picture": '<span class="{class:state-picture} {class:state-picture}-' + this.activities.state + '"></span>',
		"message": this.config.get("streamStateToggleBy") === "button"
			? '<a href="javascript:void(0)" class="{class:state-message}">{label:' + this.activities.state + '}</a>'
			: '<span class="{class:state-message}">{label:' + this.activities.state + '}</span>',
		"count": ' <span class="{class:state-count}">({data:count} {label:new})</span>'
	};
	if (label.icon) {
		element.append(templates.picture);
	}
	if (label.text) {
		element.append(this.substitute(templates.message));
		if (activitiesCount && this.activities.state == "paused") {
			element.append(this.substitute(
				templates.count,
				{"count": activitiesCount}
			));
		}
	}
	this.activities.lastState = currentState;
	return element;
}