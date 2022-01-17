function changehotkeyaction(){
	if(storage.get("abra_check_selected")=="true"){
		storage.set("abra_check_selected","false");
		$(".checkselected").attr("checked", false);
	}
	else {
		storage.set("abra_check_selected","true");
		$(".checkselected").attr("checked", true);
	}
	var d=storage.get("abra_check_selected");
	chrome.extension.getBackgroundPage().storage.set("abra_check_selected",d);
	chrome.tabs.getSelected(null, function(tab) {
	  chrome.tabs.sendRequest(tab.id, {method: "changeSelectedCheck", data: d }, function(response) { });
	});
}