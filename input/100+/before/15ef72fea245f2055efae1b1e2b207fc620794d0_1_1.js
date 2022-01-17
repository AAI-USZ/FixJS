function() {
	
	// Resize UI if Window is resized
	$(window).resize(function() { resizeUI(); });
	
	$('.nav-active').show();
	$('#nav-home').parent().addClass('nav-active'); // Set home as the default active link
	$('#content-home').addClass('content-active');
	
	initialize();
	
	setupEvents();
	setupUI();
	
	//$('#nav').addClass('shown');
	
	refreshUI();
	
	$('#menuToggleSidebar, #menuToggleSidebarMobile').click(function() {
		toggleSidebar();
	});
	
	//Hide the loading screen
	$('.lightbox_bg').hide();
	$('.modal_load').hide();
}