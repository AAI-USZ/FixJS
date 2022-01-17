function() {
		var userName = readCookie('username');
		if(userName !== null) {
			$('#user').val(userName);
		}
		$('#user').change(function() {
			createCookie('username',$('#user').val());
		});
		$('#comment-new').hide();
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
		$('#comment-form').ajaxForm({
			beforeSerialize: function() {
				diffMirror.save();
			},
			success:function(){
				getCode(query.id,writeCodeLines,handleAjaxError);
				$('#text').val('');
				closeCommentBox();
			},
			error:handleAjaxError
		});
		$('#code').append(
			$('<button type="button">Merge Diffs</input>').click(merge));
		getLanguageData(function(language_ob) {
			language_data = language_ob;
			getCode(query.id,writeCodeLines,handleAjaxError);
		},handleAjaxError);
	}