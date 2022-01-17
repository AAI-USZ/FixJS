function() {
						$(item).remove();
						if($("ul.members li:visible").length > 1) {
							$("button.delete", list).show();
						}
					}