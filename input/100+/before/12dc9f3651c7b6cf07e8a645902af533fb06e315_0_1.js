function() {

	// 活動規則
	var $the_rule = jQuery('#the_rule');

	$the_rule.on('click', function() {
		var template = $the_rule.find('#template').html();

		jQuery('<div>')
		.html(template)
		.dialog({
			title: '詳細說明',
			width: 640,
			modal: true
		})
		.dialog( "widget" )
		.css('top', $(window).scrollTop()+50 )
	});


	var $girls_area = jQuery('[id^=girl_id_]');

	// 展開詳細資料/投票
	$girls_area.find('#girl_vote').on('click', function() {
		$element = jQuery(this);

		$element.siblings('#girl_detail_info').css('top', $(window).scrollTop()+30).show();
	});

	// 關閉詳細資料/投票
	$girls_area.find('[id=detail_close]').on('click', function() {
		$element = jQuery(this);

		$element.parents('#girl_detail_info').hide();
	});
	jQuery(document).on('keydown', function(e) {
		if (e.which == 27) {
			jQuery('[id=girl_detail_info]').hide();
		}
	})

	// 詳細資料內的照片隨選-往右
	$girls_area.find('#btn_right_click').on('click', function() {
		var $element = jQuery(this);
		var $root    = $element.parent();

		if ( $root.find('#twinned.first').next('#twinned').length ) {
			$root.find('#twinned.first').removeClass('first').next('#twinned').addClass('first');
		}
		else {
			$root.find('#twinned.first').removeClass('first');
			$root.find('#twinned').first().addClass('first');
		}
	});

	// 詳細資料內的照片隨選-往左
	$girls_area.find('#btn_left_click').on('click', function() {
		var $element = jQuery(this);
		var $root    = $element.parent();

		if ( $root.find('#twinned.first').prev('#twinned').length ) {
			$root.find('#twinned.first').removeClass('first').prev('#twinned').addClass('first');
		}
		else {
			$root.find('#twinned.first').removeClass('first');
			$root.find('#twinned').last().addClass('first');
		}
	});

	// 投票給她
	$girls_area.find('#vote_she').on('click', function() {

		if ( ! confirm('您確定要投下您神聖的一票？\nPS:每人每系票選皆有 1 票的權力。')) { return }

		var $btn = jQuery(this);
		var vote_name = $btn.data('vote-name');
		jQuery.ajax({
			context    : this,
			url        : '/event/2012-girls-vote/vote_girl',
			type       : 'post',
			dataType   : 'json',
			data       : {
				name: vote_name
			},
			beforeSend : function(jqXHR, settings){},
			success    : function(data, textStatus, jqXHR) {
				if (data.success) {
					alert(data.success_msg);
				}
				else if (data.success !== true){
					alert(data.error_msg);
				}
				else {
					alert('後端程式發生不明錯誤')
				}
			},
			complete   : function(jqXHR, textStatus) {}
		});
	});
}