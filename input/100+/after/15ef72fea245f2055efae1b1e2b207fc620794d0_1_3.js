function refreshUI() {
	set = Settings.get();
	
	if(set['showSidebar'] == 0) { // Hide the sidebar
		$('#nav').addClass('hide');
		sidebar('hide');
	}
	else {
		sidebar('show');
	}
	
	$('#settingThemeSelect').val(''+set['theme']);

	$('#settingShowSidebar').attr('checked', set['showSidebar']);
	
	// Add the stylesheet
	$('link[data-theme=theme]').attr('href', 'themes/'+set['theme']+'/theme.css');
	$('link[data-theme=bootstrap]').attr('href', 'themes/'+set['theme']+'/bootstrap.min.css');
	
	/*theme = '<link rel="stylesheet" href="themes/'+set['theme']+'/theme.css" media="screen"/>';
	$('head').append(theme);*/
	
	/*$('#settingShowNotepad').attr('checked', set['showApps']['notepad']);
	$('#settingShowShoppingList').attr('checked', set['showApps']['shoppinglist']);*/
	
	$.each(APPS, function(index, value) {
	    $('#settingShow-'+value['name']).attr('checked', set['showApps'][value['name']]);
	});
	
	$(document.body).trigger('refreshUI', [set]);
	
	//$('#content').css('margin-left','25%');
	resizeUI();
}