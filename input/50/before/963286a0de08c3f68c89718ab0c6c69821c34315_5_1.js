function() {
       if (xp_resizeTimer) clearTimeout(xp_resizeTimer);
       xp_resizeTimer = setTimeout(xp_ext_resize, 500);
    }