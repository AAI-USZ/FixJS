function getPicContent(obj, msg)
	{
		//<div class="floorBox_right_T">
		var content = $(msg).find("div.floorBox_right_T").html();
		//<div class="img_resize restore_C gut_style" rel="content">
		obj.find("div#content").append(content);
		if ($("input#only_attach")[0].checked)
		{
			obj.find("div#content").find("div.img_resize.restore_C.gut_style").hide();
		}
		obj.find("div#content").find("img[data-ks-lazyload]").each(function(){
			$(this).attr("src", $(this).attr("data-ks-lazyload"));
		});
	}