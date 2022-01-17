function(){
	
	var adminPanel_extension_resizeTimer = null;
	
	$(window).bind('resize', function() {
	   if (adminPanel_extension_resizeTimer) clearTimeout(adminPanel_extension_resizeTimer);
	   adminPanel_extension_resizeTimer = setTimeout(adminPanel_extension_resize, 500);
	});
	
}