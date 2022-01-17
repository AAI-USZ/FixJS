function (e) {
	console.log(e);
	this.modifiedCell = e.target;
	if (this.commands.className == 'hidden') {
		var strs = this.modifiedCell.id.split('-');
		this.commands.className = 'displayed line_' + strs[0] + ' col_' + strs[1];
	}
	else
		this.commands.className = 'hidden';
}