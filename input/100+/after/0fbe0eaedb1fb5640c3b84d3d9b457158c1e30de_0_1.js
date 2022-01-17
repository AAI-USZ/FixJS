function(jsondata) {
				if(jsondata.status == 'success') {
					var entries = $('#leftcontent').empty();
					$(jsondata.data.entries).each(function(i, entry) {
						entries.append(OC.Journal.Entry.createEntry(entry));
					});
					$('#leftcontent').removeClass('loading');
					OC.Journal.Journals.doSort('dtasc');
					console.log('Count: ' + $('#leftcontent li').length);
					if($('#leftcontent li').length > 0 ){
						var firstitem;
						if(id) {
							firstitem = $('#leftcontent li[data-id="'+id+'"]');
						} else {
							firstitem = $('#leftcontent li').first();
							if(firstitem.length == 0) {
								return;
							}
							id = firstitem.data('entry').id;
						}
						firstitem.addClass('active');
						OC.Journal.Journals.scrollTo(id);
						OC.Journal.Entry.loadEntry(firstitem.data('id'), firstitem.data('entry'));
					}
				} else {
					OC.dialogs.alert(jsondata.data.message, t('contacts', 'Error'));
				}
			}