function(element) {
	"use strict";

	var mapping, self;

	self = this;

	mapping = [];
	mapping[8] = "Backspace";
	mapping[9] = "Tab";
	mapping[13] = "Enter";
	mapping[27] = "Escape";
	mapping[32] = "Space";
	mapping[37] = "Left";
	mapping[38] = "Up";
	mapping[39] = "Right";
	mapping[40] = "Down";
	mapping[46] = "Delete";

	element.addEventListener ("keydown", function(e) {
		var action, func, key, match, ascii;

		if (self.frozen || e.ctrlKey || e.metaKey || e.altKey) {
			return;
		}

		self.reportError (false);

		key = e.keyCode;
		if (key >= 65 && key <= 90) {
			key = String.fromCharCode (key);
		} else {
			key = mapping[key] || key;
		}

		if (e.shiftKey) {
			key = "Shift" + key;
		}

		action = self.shortcuts[key];
		func = self[action];

		if (!action || typeof func !== "function") {
			return;
		}

		try {
			func.call (self);
		} catch (e) {
			self.reportError (e.message);
		}

		e.preventDefault ();
		return false;
	});

	element.addEventListener ("mousedown", function(e) {
		var target;

		if (self.frozen) {
			return;
		}

		target = e.target;
		if (target.nodeType === 3) {
			target = target.parentNode;
		}

		if (target === self.frame.contentWindow.document.documentElement) {
			target = self.root;
		}

		self.changeCursor (target);
		self.frame.contentWindow.focus ();

		e.preventDefault ();
		e.stopPropagation ();
		return false;
	});
}