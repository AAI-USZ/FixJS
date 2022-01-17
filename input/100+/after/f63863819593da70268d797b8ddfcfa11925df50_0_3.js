function () {
		 $("#uploadForm").submit(function(){
			$(this).ajaxSubmit({ 	
				url :"/backend/admin/upload/json?session=" + TissueStack.Admin.prototype.session,
				dataType : "json",
				success: function(data, textStatus, jqXHR) {
					if (!data.response && !data.error) {
						alert("no file submission!");
						return false;
					}
					
					if (data.error) {
						var message = "Error: " + (data.error.message ? data.error.message : " no file submission!");
						alert(message);
						return false;
					}
					
					if (data.response.noResults) {
						alert("No results!");
						return false;
					}
					alert("File has been successfully uploaded");
					$('.file_radio_list').fadeOut(500, function() { 
						$('.file_radio_list').html("");
					 	TissueStack.Admin.prototype.showAllList();
					});
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert("Error connecting to backend: " + textStatus + " " + errorThrown);
					return false;
				}
			});
			return false;
		});
	}