function(){
			var needed_name = $(this).find("input[name=needed_name]").val();
			var needed_api = $(this).find("select").val();
			
			if(needed_name != null && needed_api != null && needed_name != "" && needed_api != ""){
				$(this).find("input.input").val("");
				needed_name = "\"" + needed_name + "\":";
				var response = $(this).parents(".resource").find("." + needed_api + " .response_body").html();
				if(response != null && response.indexOf( needed_name ) != -1){
					var temp = response.substring(response.indexOf( needed_name ));
					var value = temp.split(",")[0].substring(needed_name.length).replace(/\"/g,"");
					$(this).find("input.input").val(value);
				}
			}
		}