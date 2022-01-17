function() {
		$("#insertterms").html(this.value ? '&lt;input type="hidden" name="s.fvgf[]" value="SubjectTerms,or,' + this.value + '" /&gt;<br />' : '');
	}