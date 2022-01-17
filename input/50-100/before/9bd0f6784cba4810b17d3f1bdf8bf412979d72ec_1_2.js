function() {
				var originalDocumentWrite = document.write;
				try {
					$("#stdout").val("");
					document.write = function(string) {
						$("#stdout").val($("#stdout").val() + string);
					};
					eval($("#js").val());
				} catch (e) {
					alert(e);
				} finally {
					document.write = originalDocumentWrite;
				}
			}