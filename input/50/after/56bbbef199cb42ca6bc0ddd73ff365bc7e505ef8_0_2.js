function handleDrag_dragleave (e, handleDrag) {
		if (!this.inChild) { // https://bugs.webkit.org/show_bug.cgi?id=66547
			$.single(e.target).removeClass('over');
		}
	}