function(opts) {
	var that = $(this);
	var actionSheetID = opts.id;
	var actionSheetColor =  opts.color;
	var actionSheetUuid = $.UIUuid();
	var title = "";
	if (opts.title) {
		title = "<p>" + opts.title + "</p>";
	}
	var createActionSheet = function() {
		var actionSheetStr = "<actionsheet id='" + actionSheetID + "' class='hidden' ui-contains='action-buttons'";
		if (actionSheetColor) {
			actionSheetStr += " ui-action-sheet-color='" + actionSheetColor + "'";
		}
		actionSheetStr += "><scrollpanel  ui-scroller='" + actionSheetUuid + "'><panel>";
		actionSheetStr += title;
		var uiButtons = "", uiButtonObj, uiButtonImplements, uiButtonTitle, uiButtonCallback;
		if (!!opts.uiButtons) {
			for (var i = 0, len = opts.uiButtons.length; i < len; i++) {
				uiButtonObj = opts.uiButtons[i];
				uiButtons += "<uibutton ui-kind='action' ";
				uiButtonTitle = uiButtonObj.title;
				uiButtonImplements = uiButtonObj.uiButtonImplements || "";
				uiButtonCallback = uiButtonObj.callback;
				actionSheetID.trim();
				uiButtons += ' ui-implements="' + uiButtonImplements + '" class="stretch" onclick="' + uiButtonCallback + '(\'#' + actionSheetID + '\')"><label>';
				uiButtons += uiButtonTitle;
				uiButtons +=	"</label></uibutton>"	;			
			}
		}
		actionSheetStr += uiButtons + "<uibutton ui-kind='action' ui-implements='cancel' class='stretch' onclick='$.UIHideActionSheet(\"#" + actionSheetID + "\")'><label>Cancel</label></uibutton></panel></scrollpanel></actionsheet>";
		var actionSheet = $(actionSheetStr);
		that.append(actionSheet);
		var scrollpanel = $('#'+actionSheetID).find('scrollpanel')[0];
		$.UIScrollers[actionSheetUuid] = new iScroll(scrollpanel);
	};
	createActionSheet();
	var actionSheetUIButtons = "#" + actionSheetID + " uibutton";
	$(actionSheetUIButtons).bind("click", function() {
		$.UIHideActionSheet();
	});
}