function(command) { return function() {
		// "Among commands defined in this specification, those listed in
		// Miscellaneous commands are always enabled. The other commands defined
		// here are enabled if the active range is not null, and disabled
		// otherwise."
		return $_( ["copy", "cut", "paste", "selectall", "stylewithcss", "usecss"] ).indexOf(command) != -1
			|| range !== null;
	}}