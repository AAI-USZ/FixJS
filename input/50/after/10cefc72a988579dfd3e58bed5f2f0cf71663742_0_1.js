function() {
						$(item).remove();
						if($("ul.ts-members li:visible").length > 1) {
							$("button.delete", list).show();
						}
					}