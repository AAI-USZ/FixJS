function add() {
	if (arguments.length == 0)
		throw Error('add() syntax error: first argument is widget');

	var self = this;
	var args = Array.prototype.slice.call(arguments);
	var widget = args[0];

	widget.parent = this;

	if ('actor_list' in self)
		self.actor_list.push(widget);
	else
		self.actor_list = [ widget ];

	/* Call internal method in next time, to avoid that process was confused cause crashing */
	process.nextTick(function() {
		self._add.apply(self, args);
	});

	/* If container belongs to specific application, child has the same one as well. */
	if ('application' in this) {

		/* TODO: Combine setApplication and getWidgetIdDict, DO NOT traverse widget tree twice. */
		internal.setApplication(widget, this.application);

		/* Get all child of window which has id, to append them to list */
		internal.getWidgetIdDict(widget, function(idDict) {

			/* Append to widget list of application */
			for (var id in idDict)
				self.application.widget[id] = idDict[id];
		});
	}
}