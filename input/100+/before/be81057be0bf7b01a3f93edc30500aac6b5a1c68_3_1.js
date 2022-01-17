function launchSmallPopup(title, html, btnFinishedText, doneAction) {
	$("<div id='modalBox'><div>").html(html).appendTo(document.body);
	if (doneAction == null) { doneAction = defaultDoneAction }
	$("#modalBox").dialog({
			modal: true,
			width: 315,
			maxHeight: 300,
			title: title,
			buttons: [{ text:i18n("action.cancel"), click: cancel, id:"cancel" },
			          		{ text:btnFinishedText,  click: doneAction, id:"done" }],
			close: function() { $(this).remove(); }
	});
	$("#modalBox").bind("keydown", function(e) {
		if (e.keyCode === 13){
			$("#done").click();
			return false;
		}
	});
}