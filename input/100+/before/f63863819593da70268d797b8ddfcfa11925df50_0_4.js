function () {	
	    $(".submit_new_file").click(function(){
			//TODO: fix it later for the exists file validation
			$.getJSON("/backend/admin/upload_directory/json",function(result){
			  $.each(result, function(i, field){
			  	for (i in field){
					if(field[i] == $('#filename_1').val()){
						var first_msg = "<p>Already in the upload destination!</p>";
						var second_msg = "<h2>File " + $('#filename_1').val() + " exists</h2>";
						TissueStack.Admin.prototype.fileUploadMessage(first_msg, second_msg);
						return;
					}
			      }
			  });
			});
			
			if(TissueStack.Admin.prototype.session == null || $('#filename_1').val()=="" || (TissueStack.Admin.prototype.session == null && $('#filename_1').val()!="")){
				var first_msg = (TissueStack.Admin.prototype.session == null? "Please login again first":"Please select file to upload");
				var second_msg = (TissueStack.Admin.prototype.session == null?"<h2>No more session available</h2>":"<h2>No file was selected</h2>");
				TissueStack.Admin.prototype.fileUploadMessage(first_msg, second_msg);
				return;
			}
			
			if (!TissueStack.Admin.prototype.session == "" && $('#filename_1').val()!=""){    	
				var first_msg = "<p>I love eating mnc files. Please give me more ^^</p>";
				var second_msg = "<h2>File Uploaded!</h2>";
				TissueStack.Admin.prototype.fileUploadMessage(first_msg, second_msg);
				return;
			 }
		});
	}