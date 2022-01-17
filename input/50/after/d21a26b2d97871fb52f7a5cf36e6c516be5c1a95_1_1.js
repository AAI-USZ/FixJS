function (contentCreator) {
	var block = $("<tbody></tbody>").addClass("block");
	contentCreator(block);
	block.appendTo(this.contentArea);
	return block;
}