function() {

		dscourse.AddPost();
		var discussionID = $('#dIDhidden').val();
		$('#commentWrap').fadeOut('fast');
		$('#overlay').hide();
		clearPostForm();
		dscourse.SingleDiscussion(discussionID);
	}