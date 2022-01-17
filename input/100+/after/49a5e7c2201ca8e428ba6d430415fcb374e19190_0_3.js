function () {
		var _this = this;
		var bar = $('.bar');
		var percent = $('.percent');
		   
		$('#uploadForm').ajaxForm({
		    beforeSend: function() {
		        var percentVal = '0%';
		        bar.width(percentVal)
		        percent.html(percentVal);
		    },
		    uploadProgress: function(event, position, total, percentComplete) {
		        var percentVal = percentComplete + '%';
		        bar.width(percentVal)
		        percent.html(percentVal);
		    },
		    complete: function (xhr) {
		    	//_this.replaceErrorMessage(xhr.responseText);
		    }
		}); 
	}