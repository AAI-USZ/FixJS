function() {
       if (export_resizeTimer) clearTimeout(export_resizeTimer);
       export_resizeTimer = setTimeout(export_extension_resize, 500);
    }