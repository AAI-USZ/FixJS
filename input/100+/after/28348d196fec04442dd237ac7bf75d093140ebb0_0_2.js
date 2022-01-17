function(e) {
		    if (e.which === 1){
			addClickableLiteralBox($(this), $(this).closest($("table")).attr("id"),$(this).attr("id"));
		    }
		}