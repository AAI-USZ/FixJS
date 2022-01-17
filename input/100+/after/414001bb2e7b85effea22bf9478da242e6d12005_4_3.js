function loadCheckboxes(){
	var first=storage.get("abra_check_input");
	var second=storage.get("abra_check");
	var third=storage.get("abra_check_selected");
	initStorage();
	if(first=="true") first=true; else first=false;
	if(second=="true") second=true; else second=false;
	if(third=="true") third=true; else third=false;
	$(".abracheck").attr("checked",second);
	$(".abracheckInput").attr("checked",first);
	$(".checkselected").attr("checked",third);
	var hotkey=storage.get("abra_hotkey");
	$(".currenthot").html("<i>"+hotkey+"</i>");
}