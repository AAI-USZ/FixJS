function() {

var formfield_img = "";
var formfield_title = "";
var formfield_sub = "";
var formfield_legend = "";
var formfield_code = "";

// Refresh orders of DB slides
jQuery("div#code").each(function () {
	var code = jQuery(this).attr("code_pays");
	refresh_order(code);
	jQuery(".table-"+code).each( function (index) {	
		delete_button (index, code);
		down_button (index, code);
		up_button (index, code);
		upload_button (index, code);
	});
});

function refresh_order(code) {
	var tables  = jQuery(".table-"+code);
	var titles  = jQuery(".title-"+code);
	var subs    = jQuery(".sub-"+code);
	var legends = jQuery(".legend-"+code);
	var urls    = jQuery(".url-"+code);
	var images  = jQuery(".image-"+code);
	var imgurl  = jQuery(".thickbox");
	var uplink  = jQuery(".up-"+code);
	var dwlink  = jQuery(".down-"+code);
	var buttons = jQuery(".remove_table-"+code);
	for (var i = 0; i < tables.length; i++) {
		jQuery(tables[i] ).attr("id"  , "form-table-"+code+"-"+i);
		jQuery(titles[i] ).attr("id"  , "title-"+code+"-"+i);
		jQuery(titles[i] ).attr("name", "title-"+code+"-"+i);
		jQuery(subs[i]   ).attr("id"  , "sub-"+code+"-"+i);
		jQuery(subs[i]   ).attr("name", "sub-"+code+"-"+i);
		jQuery(images[i] ).attr("id"  , "image-"+code+"-"+i);
		jQuery(images[i] ).attr("name", "image-"+code+"-"+i);
		jQuery(imgurl[i] ).attr("id"  , "content-add_media-"+i);
		jQuery(legends[i]).attr("id"  , "legend-"+code+"-"+i);
		jQuery(legends[i]).attr("name", "legend-"+code+"-"+i);
		jQuery(urls[i]   ).attr("id"  , "url-"+code+"-"+i);
		jQuery(urls[i]   ).attr("name", "url-"+code+"-"+i);
		jQuery(uplink[i] ).attr("id"  , "up-"+code+"-"+i);
		jQuery(uplink[i] ).attr("count", i);
		jQuery(dwlink[i] ).attr("id"  , "down-"+code+"-"+i);
		jQuery(dwlink[i] ).attr("count", i);
		jQuery(buttons[i]).attr("id"  , "remove_table-"+code+"-"+i);
		jQuery(buttons[i]).attr("name", "form-table-"+code+"-"+i);
	}
}

function delete_button (activeCount, code) {
	jQuery("#remove_table-"+code+"-"+activeCount).click(function() {
		jQuery("#"+jQuery(this).attr('name')).delay('1000').fadeOut('slow').remove();
		jQuery(this).remove();
		refresh_order(code);
	});
}

function down_button (activeCount, code) {
	jQuery("#down-"+code+"-"+activeCount).click(function() {
		if (jQuery(this).attr("count") != jQuery(".table-"+code).length-1) {
			var current = jQuery("#form-table-"+code+"-"+jQuery(this).attr("count"));
			current.next().after(current);
			refresh_order(code);
		}
	});
}

function up_button (activeCount, code) {
	jQuery("#up-"+code+"-"+activeCount).click(function() {
		if (jQuery(this).attr("count") != 0) {
			var current = jQuery("#form-table-"+code+"-"+(jQuery(this).attr("count")-1));
			current.next().after(current);
			refresh_order(code);
		}
	});
}

function upload_button (activeCount, code) {
	jQuery("#content-add_media-"+code+"-"+activeCount).click(function() {
		formfield_img    = jQuery(this).siblings();
		formfield_title  = jQuery(jQuery(this).parents('tr').siblings().get(0)).find('td>input');
		formfield_sub    = jQuery(jQuery(this).parents('tr').siblings().get(1)).find('td>input');
		formfield_legend = jQuery(jQuery(this).parents('tr').siblings().get(2)).find('td>input');
		//tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');
	});
}

if(jQuery('form.content_home').length > 0) {
	window.send_to_editor = function(html) {
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
}

jQuery(function() {
	jQuery(".add").each ( function () {
		var code = jQuery(this).attr('code_pays');
		jQuery("#slide_list-"+code).sortable({
			update: function(event, ui) {
				refresh_order(code)
			}
		});
	});
});

jQuery(function() {
	jQuery("#tabs").tabs();
});

/***ADD SLIDE***/
jQuery(".add").click('bind',function() {
	var code = jQuery(this).attr('code_pays');
	var activeCount = jQuery(".table-"+code).length;
	var last_slide = jQuery("#form-table-"+code+"-"+parseInt(activeCount-1));
	if (!last_slide.is('*')) {
		last_slide = jQuery("#sentinel-"+code);
	}
	last_slide.after(
		'<table class="table-'+code+'" id="form-table-'+code+'-'+activeCount+'">'+
			'<tr align="left">'+
				'<th scope="row">Titre :</th>'+
				'<td>'+
					'<input name="title-'+code+'-'+activeCount+'" class="title-'+code+'" id="title-'+code+'-'+activeCount+'"></input>'+
				'</td>'+
			'<tr align="left">'+
				'<th scope="row">Sous-titre :</th>'+
				'<td>'+
					'<input name="sub-'+code+'-'+activeCount+'" class="sub-'+code+'" id="sub-'+code+'-'+activeCount+'"></input>'+
				'</td>'+
			'</tr>'+
			'<tr align="left">'+
				'<th scope="row">Légende :</th>'+
				'<td>'+
					'<input name="legend-'+code+'-'+activeCount+'" class="legend-'+code+'" id="legend-'+code+'-'+activeCount+'"></input>'+
				'</td>'+
			'</tr>'+
			'<tr align="left">'+
				'<th scope="row">Url :</th>'+
				'<td>'+
					'<input name="url-'+code+'-'+activeCount+'" class="url-'+code+'" id="url-'+code+'-'+activeCount+'"></input>'+
				'</td>'+
			'</tr>'+
			'<tr align="left">'+
				'<th scope="row">Image :</th>'+
				'<td>'+
					'<a href="media-upload.php?post_id=1&amp;TB_iframe=1" class="thickbox add_media" id="content-add_media-'+code+'-'+activeCount+'" title="Add Media" onclick="return false;">'+
					'Upload/Insert</a>'+
					'<input class="image-'+code+'" name="image-'+code+'-'+activeCount+'" id="image-'+code+'-'+activeCount+'" type="hidden" ></textarea>'+
				'</td>'+
			'</tr>'+
			'<tr>'+
				'<th>'+
					'<a class="up-'+code+'" id="up-'+code+'-'+activeCount+'" count='+activeCount+' href="#" onclick="return false;">Monter</a> / '+
					'<a class="down-'+code+'" id="down-'+code+'-'+activeCount+'" count='+activeCount+' href="#" onclick="return false;">Descendre</a>'+
				'</th>'+
				'<td>'+
					'<button type="button" style="border-color:#FF4D1A;background:#FF4D1A;'+
					'float:right;"id="remove_table-'+code+'-'+activeCount+'"'+
					'class="remove_table-'+code+' button-primary" name="form-table-'+code+'-'+activeCount+'">Supprimer</button>'+
				'</td>'+
			'</tr>'+
	'</table>'
	);

	delete_button (activeCount, code);
	down_button (activeCount, code);
	up_button (activeCount, code);
	upload_button (activeCount, code);

/*
	window.send_to_editor = function(html) {
		imgurl = jQuery('img',html);
		if (formfield_img !== "") {
			formfield_img.val(imgurl.attr('src'));
			var p = jQuery(formfield_img.before(jQuery('<p>',{class:"img_home"}))).prev();
			p.append(imgurl);  
		}
		if (formfield_title !== "") {
			formfield_title.val(imgurl.attr('title'));
		}
		if (formfield_legend !== "") {
			var str = html.match(/<\/a>(.+)\[\/caption\]/)[1];
			formfield_legend.val(str);
		}
		tb_remove();
	}*/
});

/***SAVE FUNTION***/
jQuery("#save_home").click('bind',function() {
	var content;
	jQuery("div#code").each(function (index) {
		var code = jQuery(this).attr("code_pays");
		content = JSON.stringify(jQuery("#content_home-"+code).serializeArray());
		jQuery("#home_content\\["+code+"\\]").attr("value", content);
	});
	jQuery("#home_handler").submit();
});

}