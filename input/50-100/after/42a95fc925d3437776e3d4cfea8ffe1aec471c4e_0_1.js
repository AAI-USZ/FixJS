function loadEsprima() {
		if (typeof esprima !== 'undefined') { return; }
		$script = $("<script>").attr("src", require.toUrl("lib/esprima.js")).appendTo(window.document.head);
	}