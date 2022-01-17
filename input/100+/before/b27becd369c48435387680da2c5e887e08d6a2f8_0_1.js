function(j, subel) {
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
			if (comment_id && data_as_json.url) {
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
		}