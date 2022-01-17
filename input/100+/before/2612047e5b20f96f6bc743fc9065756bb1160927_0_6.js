function dragDrop() {
	$(".space").droppable({
		over : function(e, ui) {
			$(this).addClass("hover");
		},
		out : function(e, ui) {
			$(this).removeClass("hover");
		},
		drop : function(e, ui) {
			insert_idx = $(this).attr('id');
			$(this).text(ui.draggable.text());
			$(this).removeClass("space", "hover");
			$(this).addClass("word", "highlight");
			ui.draggable.hide();
			$(".space").hide();
		},
	});
	$(".highlight").draggable(
			{
				snap: '.space',
				containment: '#orig',
				cursor : 'move',
				start : function() {
					$(".space").each(
							function() {
								var num = $(this).attr('id');
								if ($("#word_" + curr_sentence + "_" + num).is(
										":visible")
										&& num != span_start) {
									$(this).show();
								}
							});
					$(".highlight").each(function() {
					});
				},
			/*	helper : function(){
					return '<div></div>';	
				}*/
			});
}