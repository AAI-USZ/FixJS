function() {
    	        		var form = this.form.getForm();
    	        		
    	        		if (this.fileField.getValue() === "" && this.urlField.getValue() === "") {
    	        			Ext.Msg.alert(i18n("Error"), i18n("Please select a file to upload or enter an URL"));
    	        			return;
    	        		}
    	        		
    	        		
    	        		if(form.isValid()){
    	        			form.submit({
    	        				url: this.uploadURL,
    	        				params: {
    	        				call: "upload",
    	                    	session: PartKeepr.getApplication().getSession()
    	                    },
    	                    success: Ext.bind(function(fp, o) {
    	                    	this.fireEvent("fileUploaded", o.result.response);
    	                    	this.close();
    	                    },this),
    	                    failure: function(form, action) {
    	                    	 var data = Ext.decode(action.response.responseText);
    	                         
    	                         request = {
    	                     			response: action.response.responseText
    	                     	};
    	                         
    	                     	PartKeepr.ExceptionWindow.showException(data.exception, request);
    	                    }
    	                });
    	            }
    	        }