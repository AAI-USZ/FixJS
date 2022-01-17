function() {
		var userName = readCookie('username');
		if(userName !== null) {
			$('#user').val(userName);
		}
		$('#user').change(function() {
			createCookie('username',$('#user').val());
		});
		$('#comment_box').hide();
		$('#error').hide();
		// retrieve and display code
		var query = URI(document.URL).query(true);
		if(query.error != undefined) {
			reportError(query.error);
		}
		if(query.id === undefined) {
			reportError("Code ID not found");
			return;
		}
		$('#comment_form').ajaxForm({
			success:function(){
				getCode(query.id,writeCodeLines,handleAjaxError);
				closeCommentBox();
			},
			error:handleAjaxError
		});
		getLanguageData(function(language_ob) {
			language_data = language_ob;
			getCode(query.id,writeCodeLines,handleAjaxError);
		},handleAjaxError);
	}