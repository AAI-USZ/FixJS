function adminPanel_extension_subtab_expand(id) {
	$("#adminPanel_extension_sub1").removeClass("active");
	$("#adminPanel_extension_sub2").removeClass("active");
	$("#adminPanel_extension_sub3").removeClass("active");
	$("#adminPanel_extension_sub4").removeClass("active");
	$("#adminPanel_extension_sub5").removeClass("active");
	$("#adminPanel_extension_sub6").removeClass("active");
        $("#adminPanel_extension_sub7").removeClass("active");
        $("#adminPanel_extension_sub8").removeClass("active");
	$(".adminPanel_extension_subtab").css("display", "none");	
	
	sub_id="#adminPanel_extension_sub" +id;
	$(sub_id).addClass("active");
	
	subtab="#adminPanel_extension_s"+id;
	$(subtab).css("display", "block");
	
	$.cookie('adminPanel_extension_activePanel_'+userID, id);
}