function setHotkey(elem){
	var formname = "selecthotkey";
	if(elem.value.indexOf("Set")==-1) formname+="_rus";
	var oForm = document.forms[formname];
	var first=oForm.elements["firstkey"].value;
	var second=oForm.elements["secondkey"].value;
	var third=oForm.elements["speckey"].value;
	var hot="";
	hot=first+"+";
	if(second!="none") hot+=second+"+";
	hot+=third;
	var h=storage.get('abra_hotkey');
	storage.set('abra_hotkey',hot);
	storage.set('abra_old_hotkey',h);
	abra_load_checkboxes();
	chrome.extension.getBackgroundPage().storage.set("abra_old_hotkey",h);
	chrome.extension.getBackgroundPage().storage.set("abra_hotkey",hot);
	chrome.tabs.getSelected(null, function(tab) {
	  chrome.tabs.sendRequest(tab.id, {method: "popupOldHotkey", tabid: tab.id, data: h}, function(response) { });
	  chrome.tabs.sendRequest(tab.id, {method: "popupNewHotkey", tabid: tab.id, data: hot}, function(response) { });
	});
}