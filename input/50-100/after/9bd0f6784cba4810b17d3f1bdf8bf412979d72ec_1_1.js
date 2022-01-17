function() {
       				$("#js").val("");
				try {
					$("#js").val(translator.toJS($("#grass").val()));
				} catch (e) {
					alert(e);
				}
			}