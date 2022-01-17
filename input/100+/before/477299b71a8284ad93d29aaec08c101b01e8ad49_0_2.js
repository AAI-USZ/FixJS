function() {
	var code = jQuery(this).attr('code_pays');
	var activeCount = jQuery(".table-"+code).length;
	var last_slide = jQuery("#form-table-"+code+"-"+parseInt(activeCount-1));
	if (!last_slide.is('*')) {
		last_slide = jQuery("#sentinel");
	}
	last_slide.after(
		'<table class="table-'+code+'" id="form-table-'+code+'-'+activeCount+'">'+
			'<tr align="left">'+
				'<th scope="row">Titre :</th>'+
				'<td>'+
					'<input name="title-'+code+'-'+activeCount+'" class="title-'+code+'" id="title-'+code+'-'+activeCount+'"></input>'+
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
					'<textarea style="display:none;"class="image-'+code+'" name="image-'+code+'-'+activeCount+'" id="image-'+code+'-'+activeCount+'"></textarea>'+
					'<a href="media-upload.php?post_id=1&amp;TB_iframe=1" class="thickbox add_media" id="content-add_media-'+activeCount+'" title="Add Media" onclick="return false;">'+
					'Upload/Insert<!-- <img src="http://sandbox-wp.dev/wp-admin/images/media-button.png?ver=20111005" width="15" height="15"> --></a>'+
				'</td>'+
			'</tr>'+
			'<tr>'+
				'<th>'+
					'<a class="up-'+code+'" id="up-'+code+'-'+activeCount+'" count='+activeCount+' href="#" onclick="return false;">Monter</a> / '+
					'<a class="down-'+code+'" id="down-'+code+'-'+activeCount+'" count='+activeCount+' href="#" onclick="return false;">Descendre</a>'+
				'</th>'+
				'<td>'+
					'<button type="button" style="border-color:#FF4D1A;background:#FF4D1A;'+
					'float:right;"id="remove_table-'+activeCount+'"'+
					'class="removeTable_home button-primary" name="form-table-'+code+'-'+activeCount+'">Supprimer</button>'+
				'</td>'+
			'</tr>'+
	'</table>'
	);

	jQuery("#remove_table-"+activeCount).click(function() {
		jQuery("#"+jQuery(this).attr('name')).delay('1000').fadeOut('slow').remove();
		jQuery(this).remove();
		refresh_order(code);
	});

	jQuery("#down-"+code+"-"+activeCount).click(function() {
		if (jQuery(this).attr("count") != jQuery(".table-"+code).length-1) {
			var current = jQuery("#form-table-"+code+"-"+jQuery(this).attr("count"));
			current.next().after(current);
			refresh_order(code);
		}
	});

	jQuery("#up-"+code+"-"+activeCount).click(function() {
		if (jQuery(this).attr("count") != 0) {
			var current = jQuery("#form-table-"+code+"-"+(jQuery(this).attr("count")-1));
			current.next().after(current);
			refresh_order(code);
		}
	});

	jQuery(".add_media").click(function(){
		formfield_img = jQuery(this).siblings();
		formfield_title = jQuery(jQuery(this).parents('tr').siblings().get(0)).find('td>textarea')
		formfield_legend = jQuery(jQuery(this).parents('tr').siblings().get(1)).find('td>textarea')
	});

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
	}
}