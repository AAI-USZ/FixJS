function() {
		$(this).removeClass("tmp_highlight");
		$(this).addClass("highlight");
		insert_idx = $(this).attr('id');
		////writeCorrectionsTable();
		correctionUI();
		onBlur();
		$(".finish").mouseover(function() {
			if (!$(this).hasClass("clicked")) {
				$(this).addClass("hover");
			}
		});
		$(".finish").mouseout(function() {
			$(this).toggleClass("hover", false);
		});
		$(".space").each(function() {
			if ($(this).attr('id') != insert_idx) {
				$(this).hide();
			}
		});
		$("#inputC" + num_corr).focus();
		getHelp();
	}