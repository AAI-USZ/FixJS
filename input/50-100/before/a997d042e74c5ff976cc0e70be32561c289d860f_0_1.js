function (n) { 
			var params = { 
			    prefix: "exec",
			    id : n.attr ? n.attr("id").replace("exec_","") : -1
			};
			if ($("#filters #cb_myself").is(":checked")) {
			    params["myself"] = true;
			}
			params["execution_status"] = $("#filters :checkbox[name=execution_status]:checked").map(function() {
			    return $(this).val();
			}).get();
			return params;
		    }