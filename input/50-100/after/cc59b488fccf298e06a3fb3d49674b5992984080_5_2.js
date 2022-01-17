function(jqXHR, textStatus, errorThrown) {
								error = JSON.parse(jqXHR.responseText);
								if (error.password !== undefined) {
									readableError = error.password.join('<br />');
								} else {
									readableError = jqXHR.responseText;
								}
								view.set('error', readableError);
				}