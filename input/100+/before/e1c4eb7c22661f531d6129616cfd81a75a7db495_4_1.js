function setVoluniappDiv() {
	//create the <div> element
	var divVoluniapp = document.createElement("div");
	divVoluniapp.innerHTML = "VOLUNIAPP v2.0";
	
	//set the position of the <div> with respect to the Header
	$(divVoluniapp).css("position","absolute");
	$(divVoluniapp).css("left","15%");
	$(divVoluniapp).css("top","25%");
	$(divVoluniapp).css("display","table-cell");
	$(divVoluniapp).css("vertical-align","middle");
	//set some properties of the <div> to adjust the apparence
	$(divVoluniapp).css("font-family","Arial,Helvetica,sans-serif");
	$(divVoluniapp).css("font-size",$(".headerCTR").height()*0.6+"px");
	$(divVoluniapp).css("-webkit-user-select","none");
	$(divVoluniapp).css("color","white");
	
	//append the <div> to the Header
	$(".headerCNT").append(divVoluniapp);
}