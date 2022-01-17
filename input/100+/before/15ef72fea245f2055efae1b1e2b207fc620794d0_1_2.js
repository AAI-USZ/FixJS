function setupEvents() {
	
	$('a[data-switch], button[data-switch]').live('click', function(event) {
		//var id = $(this).attr('data-switch').split('-');
		//switchTo(id[1]);
		switchTo($(this).attr('data-switch'));
	});
	
	// Show settings dialog when settings menu item is clicked
	$('#showSettings').click(function() {
		$('#settings').addClass('modal');
		$('#settings').modal();
	});
	
	// Show mobile-friendly version of the settings dialog
	$('#showSettingsMobile').click(function() {
		$('#settings').removeClass('modal');
		$('#settings').slideDown();
		$('#settingsClose').click(function() { $('#settings').slideUp(); $(this).off(); });
	});
	
	$('#settingsSave').click(function() {
		array = {};
		$.each(APPS, function(index, value) {
		    array[value['name']] = $('#settingShow-'+value['name']).is(':checked')
		});
		
		//array = {'notepad' : $('#settingShow-notepad').is(':checked'), 
		//		'shoppinglist' : $('#settingShowShoppingList').is(':checked')};
		Settings.set('showApps', array);
		theme = $('#settingThemeSelect option').filter(':selected').text().toLowerCase();
		Settings.set('theme', theme);
		Settings.set('showSidebar', $('#settingShowSidebar').is(':checked'));
		$('#settings').modal('hide');
		refreshUI();
	});
	
	$('#menuLogout').click(function() {
			logout();		
	});
	
	$('body').trigger('setupEvents');
}