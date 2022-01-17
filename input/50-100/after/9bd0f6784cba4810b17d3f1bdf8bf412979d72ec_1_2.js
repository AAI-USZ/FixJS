function() {
				var originalDocumentWrite = document.write;
				$("#stdout").val("");
				document.write = function(string) {
					$("#stdout").val($("#stdout").val() + string);
				};
				try {
					eval($("#js").val());
				} catch (e) {
					alert(e);
				} finally {
					document.write = originalDocumentWrite;
				}
			}