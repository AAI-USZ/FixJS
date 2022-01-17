function recordCurrentOverrides( range ) {
	// "Let overrides be a list of (string, string or boolean) ordered pairs,
	// initially empty."
	var overrides = [];

	// "If there is a value override for "createLink", add ("createLink", value
	// override for "createLink") to overrides."
	if (getValueOverride("createlink" ,range) !== undefined) {
		overrides.push(["createlink", getValueOverride("createlink", range)]);
	}

	// "For each command in the list "bold", "italic", "strikethrough",
	// "subscript", "superscript", "underline", in order: if there is a state
	// override for command, add (command, command's state override) to
	// overrides."
	$_( ["bold", "italic", "strikethrough", "subscript", "superscript",
	"underline"] ).forEach(function(command) {
		if (getStateOverride(command, range) !== undefined) {
			overrides.push([command, getStateOverride(command, range)]);
		}
	});

	// "For each command in the list "fontName", "fontSize", "foreColor",
	// "hiliteColor", in order: if there is a value override for command, add
	// (command, command's value override) to overrides."
	$_( ["fontname", "fontsize", "forecolor",
	"hilitecolor"] ).forEach(function(command) {
		if (getValueOverride(command, range) !== undefined) {
			overrides.push([command, getValueOverride(command, range)]);
		}
	});

	// "Return overrides."
	return overrides;
}