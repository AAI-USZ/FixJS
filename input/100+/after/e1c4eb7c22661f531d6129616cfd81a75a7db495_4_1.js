function setVoluniappDiv() {
	//create the <span> element
	var spanVoluniapp = document.createElement("span");
	spanVoluniapp.innerHTML = "VOLUNIAPP v2.0";
	
	//set the position of the <span> with respect to the Header
	$(spanVoluniapp).css("float","left");
	$(spanVoluniapp).css("padding-left","100px");
	$(spanVoluniapp).css("text-align","left");
	$(spanVoluniapp).css("line-height",$(".headerCTR").height()+"px");
	$(spanVoluniapp).css("vertical-align","middle");
	//set some properties of the <span> to adjust the apparence
	$(spanVoluniapp).css("width","auto");
	$(spanVoluniapp).css("font-family","Arial,Helvetica,sans-serif");
	$(spanVoluniapp).css("font-size",$(".headerCTR").height()*0.6+"px");
	$(spanVoluniapp).css("-webkit-user-select","none");
	$(spanVoluniapp).css("color","white");
	
	//append the <span> to the Header
	$(".logoHeader").append(spanVoluniapp);
}