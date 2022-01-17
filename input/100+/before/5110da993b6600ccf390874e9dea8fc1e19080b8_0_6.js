function(obj){
		var url = obj.href;

		if (url.match(picRegex)){
			var auto = $(obj).parentsUntil(selectors[10]).next().find(selectors[3]).attr('href');

			if (url != auto){
				var width = $(obj).parent().width();
				$(obj).addClass('hz_img-in-post').html('<img src="'+url+'"'+(options.hz_direct_post_max > 0 ? ' style="max-width:' + options.hz_direct_post_max + 'px"' : '')+'>');
			}
		}
	}