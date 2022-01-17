function () {
		var _this = this;
		 this.uploadProgress();
		 $("#uploadForm").submit(function(){
			$(this).ajaxSubmit({ 	
				url :"/backend/admin/upload/json?session=" + _this.session,
				dataType : "json",
				success: function(data, textStatus, jqXHR) {
					if (!data.response && !data.error) {
						_this.replaceErrorMessage("No File Submission!");
						return false;
					}
					
					if (data.error) {
						var message = "Error: " + (data.error.message ? data.error.message : " No File Submission!");
						_this.replaceErrorMessage(message);				
						return false;
					}
					
					if (data.response.noResults) {
						_this.replaceErrorMessage("No Results!");
						return false;
					}
					_this.displayUploadDirectory();
					_this.replaceErrorMessage("File Has Been Successfully Uploaded!");
					$('.error_message').css("background", "#32CD32");
				},
				error: function(jqXHR, textStatus, errorThrown) {
					_this.replaceErrorMessage("Error connecting to backend: " + textStatus + " " + errorThrown);
					return false;
				}
			});
			return false;
		});
	}