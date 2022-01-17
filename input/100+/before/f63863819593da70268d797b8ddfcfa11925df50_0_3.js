function(i, field){
			  	for (i in field){
					if(field[i] == $('#filename_1').val()){
						var first_msg = "<p>Already in the upload destination!</p>";
						var second_msg = "<h2>File " + $('#filename_1').val() + " exists</h2>";
						TissueStack.Admin.prototype.fileUploadMessage(first_msg, second_msg);
						return;
					}
			      }
			  }