function ap_ext_subtab_expand(id) {
	$("#ap_ext_sub1").removeClass("active");
	$("#ap_ext_sub2").removeClass("active");
	$("#ap_ext_sub3").removeClass("active");
	$("#ap_ext_sub4").removeClass("active");
	$("#ap_ext_sub5").removeClass("active");
	$("#ap_ext_sub6").removeClass("active");
	$("#ap_ext_sub7").removeClass("active");
	$(".ap_ext_subtab").css("display", "none");	
	
	sub_id="#ap_ext_sub" +id;
	$(sub_id).addClass("active");
	
	subtab="#ap_ext_s"+id;
	$(subtab).css("display", "block");
	
	$.cookie('ap_ext_activePanel_'+usr_ID, id);
}