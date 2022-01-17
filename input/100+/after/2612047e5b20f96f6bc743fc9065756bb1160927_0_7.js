function moveClick() {
	$(".space").each(
			function() {
				// check to make sure no contiguous spaces
				var space_num = $(this).attr('id');
				if (space_num < span_start
						|| space_num > span_start + num_highlighted) {
					$(this).show();
				}
	});
	current_step = "reorder";
	generalClick("move" + num_corr);
	$("#step_buttons" + num_corr).hide();
	$("#step_text" + num_corr).hide();
	$("#qmark" + num_corr).hide();
	correctionUI();
	moving_phrase = true;
	$("#enter" + num_corr).show();
	$("#cancel" + num_corr).show();
	var phrase = "";
	var group_start = false;
	var first = "";
//	alert($("#orig").html());
	$('.highlight').each(function() {
		if (!$(this).hasClass("corrected_word")) {
			phrase += $(this).text() + ' ';
			if (!group_start) {
				group_start = true;
				first = $(this);
			} else {
				$(this).remove();
			}
		}
	});
	phrase = phrase.trim();
	dropText = phrase;
	first.text(phrase);
	dragToken = first.attr('id');
	var txt = writeSentenceWithSpaces(curr_sentence);
	$("#orig").html(txt);
	dragDrop();
	$(".finish").mouseover(function() {
		if (!$(this).hasClass("clicked")) {
			$(this).addClass("hover");
		}
	});
	$(".finish").mouseout(function() {
		$(this).toggleClass("hover", false);
	});
	getHelp();
	reorderInstructions("Drag and drop word or phrase into place.");
	return false;
}