function dayChooser(){
	
	if($(".mask").length){
		$("#daychooser").css("background-position","center 0");
		$("#daychooser2").css("background-position","center 0");
		$(".mask").remove();
		$("#hiddenDates").hide();
		$("#hiddenDates2").hide();
		$("#footer").animate({"height":"53"},300);
	}
	else{
		$("#daychooser").css("background-position","center 53px");
		$("#daychooser2").css("background-position","center 53px");
		var height = $("#hiddenDates").height() + 90;
		$("#body").append("<div class='mask'></div>");
		$("#moreInfo").append("<div class='mask'></div>");
		$("#footer").animate({"height":height},300);
		$("#hiddenDates").show();
		$("#hiddenDates2").show();
	}
}