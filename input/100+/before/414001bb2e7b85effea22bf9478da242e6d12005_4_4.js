function changeabracheck(){
	if(storage.get("abra_check")=="true"){
		storage.set("abra_check",false);
		$(".abracheck").attr("checked", false);
	}
	else {
		storage.set("abra_check",true);
		$(".abracheck").attr("checked", true);
	}
	var d=storage.get("abra_check");
	chrome.extension.getBackgroundPage().storage.set("abra_check",d);
	chrome.tabs.getSelected(null, function(tab) {
	  chrome.tabs.sendRequest(tab.id, {method: "changeLogCheck",  data: d}, function(response) { });
	});
}