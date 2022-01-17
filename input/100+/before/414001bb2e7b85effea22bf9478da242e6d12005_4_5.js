function changeabracheckinput(){
	if(storage.get("abra_check_input")=="true"){
		storage.set("abra_check_input","false");
		$(".abracheckinput").attr("checked", false);
	}
	else {
		storage.set("abra_check_input","true");
		$(".abracheckinput").attr("checked", true);
	}
	var d=storage.get("abra_check_input");
	chrome.extension.getBackgroundPage().storage.set("abra_check_input",d);
	chrome.tabs.getSelected(null, function(tab) {
	  chrome.tabs.sendRequest(tab.id, {method: "changeInputCheck", data: d }, function(response) { });
	});
}