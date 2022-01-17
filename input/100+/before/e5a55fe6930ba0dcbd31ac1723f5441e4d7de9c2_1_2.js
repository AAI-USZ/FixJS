function recordCurrentStatesAndValues() {
	// "Let overrides be a list of (string, string or boolean) ordered pairs,
	// initially empty."
	var overrides = [];

	// "Let node be the first editable Text node effectively contained in the
	// active range, or null if there is none."
	var node = $_( getAllEffectivelyContainedNodes(getActiveRange()) )
		.filter(function(node) { return isEditable(node) && node.nodeType == $_.Node.TEXT_NODE })[0];

	// "If node is null, return overrides."
	if (!node) {
		return overrides;
	}

	// "Add ("createLink", value for "createLink") to overrides."
	overrides.push(["createlink", commands.createlink.value()]);

	// "For each command in the list "bold", "italic", "strikethrough",
	// "subscript", "superscript", "underline", in order: if node's effective
	// command value for command is one of its inline command activated values,
	// add (command, true) to overrides, and otherwise add (command, false) to
	// overrides."
	$_( ["bold", "italic", "strikethrough", "subscript", "superscript",
	"underline"] ).forEach(function(command) {
		if ($_(commands[command].inlineCommandActivatedValues)
		.indexOf(getEffectiveCommandValue(node, command)) != -1) {
			overrides.push([command, true]);
		} else {
			overrides.push([command, false]);
		}
	});

	// "For each command in the list "fontName", "foreColor", "hiliteColor", in
	// order: add (command, command's value) to overrides."
	$_( ["fontname", "fontsize", "forecolor", "hilitecolor"] ).forEach(function(command) {
		overrides.push([command, commands[command].value()]);
	});

	// "Add ("fontSize", node's effective command value for "fontSize") to
	// overrides."
	overrides.push("fontsize", getEffectiveCommandValue(node, "fontsize"));

	// "Return overrides."
	return overrides;
}