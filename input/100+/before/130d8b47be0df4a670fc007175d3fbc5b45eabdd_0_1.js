function launchHelpWizard(html) {
	var modalBox = createModalBox(html);
	modalBox.addClass("help");
	$("#messageText").keyup();
	var height = window.innerHeight;
	var dialog = modalBox.dialog({
		modal: true,
		title: i18n("popup.help.title"),
		width: "95%",
		height: height,
		buttons: [
			{ text:i18n("action.close"), click:submit, id:"submit" }
		],
		close: function() { $(this).remove(); }
	});
	$(".ui-dialog").addClass("help");
	initializePopup();
}