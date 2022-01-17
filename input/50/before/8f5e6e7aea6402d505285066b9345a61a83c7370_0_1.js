function () {
												setTimeout("editor.destroy(false); editor = ''; $('#cke').attr('id', ''); $(jq(edited)).addClass('content'); edited=''; ", 250);
											}