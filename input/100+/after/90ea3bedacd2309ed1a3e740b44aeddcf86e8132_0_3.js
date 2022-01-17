function(html) {
		imgurl = jQuery('img',html);
		if(formfield_img !== ""){
			formfield_img.val(imgurl.attr('src'));
			var p = jQuery(formfield_img.after(jQuery('<p>',{class:"img_home"}))).next();
			p.append(imgurl);  
		}
		if(formfield_title !== "" && formfield_title.attr("value") == ""){
			formfield_title.val(imgurl.attr('title'));
		}
		if(formfield_sub !== "" && formfield_sub.attr("value") == ""){
			formfield_sub.val(imgurl.attr('alt'));
		}
		if(formfield_legend !== "" && formfield_legend.attr("value") == ""){
			var str = html.match(/<\/a>(.+)\[\/caption\]/);
			if (str !== null)
				formfield_legend.val(str[1]);
		}
		tb_remove();
	}