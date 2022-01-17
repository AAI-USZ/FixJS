function (response) {
			    	 var res = JSON.parse(response); //error: no parse ????
			    	 if("success" in res) {
			    		 // change dialogs to jqueryui
			    		 alert("success: " + res.success);
			    	 } else {
			    		 alert("failed: " + res.error); // if we gave it bad data
			    	 }
		        }