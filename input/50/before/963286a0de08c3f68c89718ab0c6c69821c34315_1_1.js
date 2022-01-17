function() {
	   if (ap_ext_resizeTimer) clearTimeout(ap_ext_resizeTimer);
	   ap_ext_resizeTimer = setTimeout(ap_ext_resize, 500);
	}