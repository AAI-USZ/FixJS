function canceledit(id) {
	if (typeof(id)!='undefined' && id != 0) {
		$('#htmlcontent_'+id).html(oldval);
	} else if (replyingid > 0) {
		$('#reply_'+replyingid).hide();	
	}
	$('#newforumitem').hide();
	$('#newforumitem').html('');
	replyingid = 0;
}