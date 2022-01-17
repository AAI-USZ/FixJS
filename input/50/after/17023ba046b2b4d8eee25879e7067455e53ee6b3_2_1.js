function Cookie (n/*ame*/) {
	return (n = ("; "+document.cookie).split("; "+n+"=")[1]) ? unescape(n.split(";")[0]) : "";
}