function formatAbsolute (args) {
	return this.name + " $" + formatHex(args[1], 2) + formatHex(args[0], 2);
}