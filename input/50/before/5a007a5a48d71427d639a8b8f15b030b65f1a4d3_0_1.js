function() {
		var subject_terms = '&lt;input type="hidden" name="s.fvgf[]" value="SubjectTerms,or,' + this.value + '" /&gt;<br />';
		$("#insertterms").html(this.value ? subject_terms : '');
	}