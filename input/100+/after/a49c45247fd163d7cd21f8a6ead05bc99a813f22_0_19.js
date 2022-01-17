function(label) {
	if (this.blocked) return;
	this.blocked = true;
	var content = this.dom.get("container");
	var width = content.width();
	//We should take into account that container has a 10px 0px padding value
	var height = content.outerHeight();
	this.blockers = {
		"backdrop": $('<div class="' + this.cssPrefix + '-blocker-backdrop"></div>').css({
			"width": width, "height": height
		}),
		"message": $(this.substitute('<div class="{class:blocker-message}">{data:label}</div>', {"label": label})).css({
			"left": ((parseInt(width) - 200)/2) + 'px',
			"top": ((parseInt(height) - 20)/2) + 'px'
		})
	};
	content.addClass("echo-relative")
		.prepend(this.blockers.backdrop)
		.prepend(this.blockers.message);
}