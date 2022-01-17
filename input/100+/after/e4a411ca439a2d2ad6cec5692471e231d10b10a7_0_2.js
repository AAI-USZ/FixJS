function(){
			TissueStack.Utils.sendAjaxRequest("/backend/admin/upload_directory/json", "GET", true,function(result) {
			  	$.each(result, function(i, field){
				  	for (i in field){
	 					if ($('#check_'+[i]).is(':checked')) {
	 						var msgDescription = $('#txtDesc').val();
	 						if (msgDescription == ""){
	 							TissueStack.Admin.prototype.replaceErrorMessage("Please Add Description Before Adding New Data Set!");
	 							return;
	 						}
	 						$("#bt_add_dataset").ajaxSubmit({ 	
	 							url :"/backend/admin/update_dataset/json?filename=" + field[i] + "&description=" + msgDescription,
	 							dataType : "json",
	 							success: function(data, textStatus, jqXHR) {
	 								if (!data.response && !data.error) {
	 									TissueStack.Admin.prototype.replaceErrorMessage("No Data Set Updated!");
	 									return false;
	 								}
	 								if (data.error) {
	 									var message = "Error: " + (data.error.message ? data.error.message : " No Data Set Updated!");
	 									TissueStack.Admin.prototype.replaceErrorMessage(message);				
	 									return false;
	 								}
	 								if (data.response.noResults) {
	 									TissueStack.Admin.prototype.replaceErrorMessage("No Results!");
	 									return false;
	 								}
	 								TissueStack.Admin.prototype.replaceErrorMessage("DataSet update successfully. Please go back to main canvas!");
	 								$('.error_message').css("background", "#32CD32");
	 								TissueStack.Admin.prototype.addNewDataSetToDataTree();						
	 							},
	 							error: function(jqXHR, textStatus, errorThrown) {
	 								alert("Error connecting to backend: " + textStatus + " " + errorThrown);
	 								return false;
	 							}
	 						});
				   		}
			    	};
			  	});
			});
		}