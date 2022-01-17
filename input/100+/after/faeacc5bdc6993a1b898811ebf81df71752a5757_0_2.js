function UI_prepare_post_modal(){

	$('#write-post-panel').attr('post-type', bbs_post_info.type);

	if (bbs_post_info.type == bbs_type.write_post.new) {

		$('#write-post-title').val('');

		$('#write-post-content').val('');

	} else if (bbs_post_info.type == bbs_type.write_post.reply){

		$('#write-post-title').val(bbs_post_info.quote.title);

		$('#write-post-content').val(bbs_post_info.quote.content);

	}

	if (bbs_post_info.sig_id >= 0) {

		$('input:text[name=qmd-number]').val(bbs_post_info.sig_id);

		$('input:text[name=qmd-number]').attr('disabled', false);

		$('input:radio[name=qmd-type][value=number]').attr('checked', true);

	} else {

		$('input:text[name=qmd-number]').val('');

		$('input:text[name=qmd-number]').attr('disabled', true);

		$('input:radio[name=qmd-type][value=random]').attr('checked', true);

	}

	if (bbs_post_info.can_anony) {

		$('.no-anonymous-area').hide();

		$('.anonymous-area').show();

	} else {

		$('.no-anonymous-area').show();

		$('.anonymous-area').hide();

	}

	$('.anony-checkbox').attr('checked', false);

	$('#write-post-board').text(bbs_path.getBoard().name);

	$('#write-post-panel').modal({

		 keyboard: false,

		 backdrop: 'static',

		 show: false

	});

	$('#write-post-panel').modal('toggle');

}