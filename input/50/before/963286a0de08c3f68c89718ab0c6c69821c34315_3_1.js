function() {
       if (exp_resizeTimer) clearTimeout(exp_resizeTimer);
       exp_resizeTimer = setTimeout(exp_ext_resize, 500);
    }