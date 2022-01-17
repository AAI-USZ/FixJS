function(data, textStatus, jqXHR) {
					if (!data.response && !data.error) {
						TissueStack.Admin.prototype.replaceErrorMessage("No File Submission!");
						return false;
					}
					
					if (data.error) {
						var message = "Error: " + (data.error.message ? data.error.message : " No File Submission!");
						TissueStack.Admin.prototype.replaceErrorMessage(message);				
						return false;
					}
					
					if (data.response.noResults) {
						TissueStack.Admin.prototype.replaceErrorMessage("No Results!");
						return false;
					}
					TissueStack.Admin.prototype.replaceErrorMessage("File Has Been Successfully Uploaded!");
					$('.error_message').css("background", "#4ea8ea"); 
					$('.file_radio_list').fadeOut(500, function() { 
						$('.file_radio_list').html("");
					 	TissueStack.Admin.prototype.showAllList();
					});
				}