function(match,isBlock) {
	var regExp = /<<(?:([!@£\$%\^\&\*\(\)`\~'"\|\\\/;\:\.\,\+\=\-\_\{\}])|([^>\s]+))(?:\s*)((?:[^>]|(?:>(?!>|<)))*)>(?:(>)|(<))/mg,
		content = [];
	regExp.lastIndex = this.pos;
	match = regExp.exec(this.source);
	if(match && match.index === this.pos) {
		this.pos = match.index + match[0].length;
		if(match[5]) {
			// If the macro has content then parse it as a block or run
			if(isBlock) {
				content = this.parseBlocks(">>");
			} else {
				content = this.parseRun(/(>>)/mg);
			}
		}
		var macroNode = $tw.Tree.Macro(match[1] || match[2],{
				srcParams: match[3],
				content: content,
				isBlock: isBlock,
				wiki: this.wiki
			});
		this.dependencies.mergeDependencies(macroNode.dependencies);
		return [macroNode];
	}
	return [];
}