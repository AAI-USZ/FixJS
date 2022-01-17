function UI_register_func(){

	$('#login-button').click(function(){

		var auth_code = $('input#auth-code-textbox').val();

		UI_show_backdrop();

		getSession(auth_code, UI_session_retrieved);

	});

	    	

	$('#logout-button').click(UI_logout);

	    	

	$('#favboard-nav-label').live('click', function(){

		UI_set_loading();

		view_boardlist(bbs_type.entry.favboard, -1, '', UI_update, 0);

	});

	    	

	$('#allboard-nav-label').live('click', function(){

		UI_set_loading();

		view_boardlist(bbs_type.entry.allboard, -1, '', UI_update, 0);

	});

	    				

	$('.board-entry').live('click', function(){

		UI_set_loading();

		view_board($(this).attr('board-name'), -1, -1, UI_update, 'click');

	});

	

	$('.folder-entry').live('click', function(){

		UI_set_loading();

		view_boardlist(bbs_type.entry.folder, $(this).attr('index'), $(this).attr('folder-name'), UI_update);

	});

	   

	$('.post-entry').live('click',function() {

		UI_set_loading();

		view_post($(this).attr('post-id'), UI_update, 'click');

	});

	

	$('#path-term').live('click', UI_path_click);

	

	$('#last-page-button').click(function(){

		UI_set_loading();

		var pathTerm = bbs_path.getLastTermWithType(bbs_type.path.board);

		view_board(pathTerm.name, -1, -1, UI_update, 'click', -1);

	});

	

	$('#first-page-button').click(function(){

		UI_set_loading();

		var pathTerm = bbs_path.getLastTermWithType(bbs_type.path.board);

		view_board(pathTerm.name, 1, -1, UI_update, 'click', -1);

	});

		    

	$('#next-page-button').click(function(){

		UI_set_loading();

		view_board_next_page(UI_update);

	});

		    

	$('#prev-page-button').click(function(){

		UI_set_loading();

		view_board_prev_page(UI_update);

	});

	

	$('#jump-to-post-button').click(function(){

		UI_set_loading();

		var post_id = $('#jump-to-post-input').val();

		view_board_jumpto(post_id);

	});

	

	$('#jump-to-post-input').keypress(function(event) {

		if ( event.which == 13 ) {

			UI_set_loading();

			var post_id = $(this).val();

			view_board_jumpto(post_id);

		}

	});



	$('#next-post-button').click(function(){

		UI_set_loading();

		view_next_post(UI_update);

	});

		    

	$('#prev-post-button').click(function(){

		UI_set_loading();

		view_prev_post(UI_update);

	});

	

	$('#st-prev-button').click(function(){

		UI_set_loading();

		view_post_sametopic(UI_update, 'prev');

	});

	

	$('#st-next-button').click(function(){

		UI_set_loading();

		view_post_sametopic(UI_update, 'next');

	});

	

	$('#st-head-button').click(function(){

		UI_set_loading();

		view_post_sametopic(UI_update, 'head');

	});

	

	$('#st-latest-button').click(function(){

		UI_set_loading();

		view_post_sametopic(UI_update, 'latest');

	});

	

	$('#notification-close-button').click(function(){

		$('#notification').fadeOut();

	});

	

	$('#notification').click(function(){

		$(this).fadeOut();

	});

	

	$('#reply-post-button').live('click', function(){

		getQuote($(this).attr('type'), UI_prepare_reply_post_modal);

	});

	

	$('#new-post-normal').live('click', UI_prepare_new_post_modal);

	

	$('#publish-post-button').click(UI_write_post);

	

	$('#write-post-panel .cancel-button').live('click', function(){

		if (confirm('确定舍弃当前未发布文章吗？')) {

			$('#write-post-panel').modal('hide');

		}

	});

}