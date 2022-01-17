function UI_prepare_reply_post_modal(quote_content){

	$('#write-post-panel').attr('post-type', bbs_type.write_post.reply);

	$('#write-post-title').val(quote_content.title);

	$('#write-post-content').val(quote_content.content);

	$('input:text[name=qmd-number]').val('');

	$('input:radio[name=qmd-type]').val('number');

	$('#write-post-board').text(bbs_path.getBoard().name);

	$('#write-post-panel').modal({

		 keyboard: false,

		 backdrop: 'static',

		 show: false

	});

	$('#write-post-panel').modal('toggle');

}