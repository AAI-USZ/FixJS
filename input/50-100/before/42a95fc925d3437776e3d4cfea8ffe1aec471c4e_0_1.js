function loadEsprima() {
		if (typeof esprima === 'undefined') {
			console.log("Loading esprima.js");
			$script = $("<script>").attr("src", require.toUrl("lib/esprima.js")).appendTo(window.document.head);
		} else {
			console.log("Esprima already loaded");
		}
	}