function () {
												console.log('successfully closed the clip');
												setTimeout("editor.destroy(false); editor = null; $('#cke').attr('id', ''); $(jq(edited)).addClass('content'); edited=''; noUpdate = false;", 1000);
											}