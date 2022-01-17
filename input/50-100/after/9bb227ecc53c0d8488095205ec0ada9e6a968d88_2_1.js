function(){
			var text = this.descriptions[$("#expense-type-select").val()];
			if(text != null && text != ""){
				$("#type-description").html(text);
			}
			else{
				$("#type-description").html($("#no-description-template").text());
			}
		}