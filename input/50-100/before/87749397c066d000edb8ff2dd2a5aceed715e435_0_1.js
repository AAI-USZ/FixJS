function(match,isBlock) {
	this.pos = match.index + match[0].length;
	var classedRun = this.parseClassedRun(/(\r?\n)/mg);
	return [$tw.Tree.Element("h1",{"class": classedRun["class"]},classedRun.tree)];
}