function(event){
		var $tgt = $(event.target);
		var item = $tgt.is('li')?$($tgt):($tgt).parents('li').first();
		if(item.length == 0) {
			return true;
		}
		var id = item.data('id');
		item.addClass('active');
		var oldid = $('#entry').data('id');
		console.log('oldid: ' + oldid);
		if(oldid != 0){
			$('#leftcontent li[data-id="'+oldid+'"]').removeClass('active');
		}
		OC.Journal.Entry.loadEntry(id, item.data('entry'));
		return false;
	}