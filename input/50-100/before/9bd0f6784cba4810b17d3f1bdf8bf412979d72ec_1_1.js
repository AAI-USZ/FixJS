function() {
				try {
					$("#js").val("");
					$("#js").val(translator.toJS($("#grass").val()));
				} catch (e) {
					alert(e);
				}
			}