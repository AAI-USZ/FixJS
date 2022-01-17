function (node) {
		var text = $(node).cleditor()[0].doc.body.innerText;

		return text === "" || text === "\n";
	}