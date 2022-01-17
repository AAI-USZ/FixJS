function () {
		//USED FOR ADD DATASET TO DATA TREE IN MAIN VIEW
		$("#bt_add_dataset").click(function(){
			TissueStack.Utils.sendAjaxRequest("/backend/admin/upload_directory/json", "GET", true,function(result) {
			  	$.each(result, function(i, field){
				  	for (i in field){
	 					if ($('#check_'+[i]).is(':checked')) {
	 					console.info(field[i]);
				    }
			    };
			  });
			});
		});
	}