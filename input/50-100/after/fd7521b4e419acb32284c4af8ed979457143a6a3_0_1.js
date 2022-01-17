function setTransientParent(_parent) {
	var self = this;

	this.parent = _parent;

	if ('actor_list' in self)
		_parent.actor_list.push(this);
	else
		_parent.actor_list = [ this ];

	this._setTransientParent(_parent);

	if ('application' in _parent) {

		/* TODO: Combine setApplication and getWidgetIdDict, DO NOT traverse widget tree twice. */
		setApplication(this, _parent.application);

		/* Get all child of window which has id, to append them to list */
		getWidgetIdDict(this, function(idDict) {

			/* Append to widget list of application */
			for (var id in idDict)
				_parent.application.widget[id] = idDict[id];
		});
	}
}