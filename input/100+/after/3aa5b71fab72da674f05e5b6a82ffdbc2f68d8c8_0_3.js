function(i, el) {
	    var el_obj = $(el);
	    var data_as_string = el_obj.find('input[name=feedback_params]').attr('value');
	    var data_as_json = $.parseJSON(data_as_string);
	    var id;
	    try {
		id = (data_as_json.target_fbid ? data_as_json.target_fbid : data_as_json.fbid);
	    }
	    catch(err) {
	    }
	    if (id) {
		var parent = 
		    el_obj.find('input[name=timeline_log_data]').attr('value') ? 
		    el_obj.parent().parent() : 
		    window.location.href.match('facebook.com/permalink') ? 
			el_obj.parent().parent().parent().parent() : 
			el_obj.parent();

		data_as_json.body = 
		    parent.find('.messageBody').first().html() || 
		    parent.find('.uiStreamMessage').first().html();
		data_as_json.author = 
		    parent.find('.actorDescription a').first().html();
		data_as_json.link = 
		    sanitize_link(
			parent.find('.shareMediaLink').first().attr('href') || 
			parent.find('a.shareText').first().attr('href')
		    );
		data_as_json.attachments = [];
		parent.find('.uiStreamAttachments a').each(function(q, ael) {
		    if ($(ael).attr('ajaxify') && !$(ael).attr('ajaxify').match(/^\/ajax\//)) {
			data_as_json.attachments.push($(ael).attr('ajaxify'));
		    }
		});
		var cleanse_items = new Array('comment_id','offset','total_comments');
		data_as_json.url = 
		    sanitize_link(
			(
			    el_obj.find('span.uiStreamSource a').first().attr('href') || 
			    el_obj.find('a.uiLinkSubtle').first().attr('href')
			),
			cleanse_items
		    );
		if (data_as_json.url && data_as_json.url.match(/^\//)) {
		    data_as_json.url = 'http://www.facebook.com' + data_as_json.url;
		}
		if (window.location.href.match('facebook.com/permalink')) {
		    data_as_json.url = sanitize_link(window.location.href, cleanse_items);
		}
		if (!el_obj.attr('has_been_bummed')) {
		    if (data_as_json.url) {
			if (data_as_json.link) {
			    new_links[data_as_json.link] = true;
			    console.log('adding a new link - ' + data_as_json.link + ' true url is ' + sanitize_link(data_as_json.url, cleanse_items));
			    bum.links[data_as_json.link] = {
				reference: true,
				true_url: sanitize_link(data_as_json.url, cleanse_items)
			    }
			}
			new_links[data_as_json.url] = true;
			bum.links[data_as_json.url] = { 
			    data: data_as_json,
			    id: id,
			};
			var subel = el_obj.find('.UIActionLinks_bottom');
			var likeel = subel.find('.like_link')
			if (likeel && likeel.length > 0) {
			    $(likeel).after(' &middot; <span class="bummer_' + id + '"></span>');
			} else {
			    $(subel).prepend('<span class="bummer_' + id + '"></span> &middot; ');
			}
		    }
		    el_obj.attr('has_been_bummed', true);
		}
		el_obj.find('div.commentActions').each(function(j, subel) {
		    var comment_as_json = {};
		    for(var i in data_as_json) {
			comment_as_json[i] = data_as_json[i];
		    }
		    var subel_obj = $(subel);
		    if (!subel_obj.attr('has_been_bummed')) {
			var subel_parent = subel_obj.parent();
			comment_as_json.comment_body = subel_parent.find('.commentBody').first().html();
			comment_as_json.comment_author = subel_parent.find('.actorName').html();
			comment_as_json.comment_link = subel_parent.find('a.external').first().attr('href');
			var comment_id = subel_obj.find('button.cmnt_like_link').attr('value');
			if (comment_id && data_as_json.url && data_as_json.url.indexOf('comment_id=')==-1) {
			    comment_as_json.url = data_as_json.url + 
				((data_as_json.url.indexOf('?')==-1)?'?':'&') + 
				'comment_id=' + comment_id;
			    comment_as_json.comment_id = comment_id;
			    id = 'comment_' + comment_id;
			    new_links[comment_as_json.url] = true;
			    bum.links[comment_as_json.url] = {
				data: comment_as_json,
				id: id
			    };
			    $(subel).children().last().after(' &middot; <span class="bummer_' + id + '"></span>');
			}
			subel_obj.attr('has_been_bummed', true)
		    }
		});
	    }
	}