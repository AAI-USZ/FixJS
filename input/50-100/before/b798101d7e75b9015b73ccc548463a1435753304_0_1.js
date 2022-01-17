function animateEl(el, v) {
        v = v || '';
        var parent = e.parent();
        el.animate({ top: 0.3 * parseInt(parent.height()) }, 350, 'linear', function () {
            $(this).html(v).css({ top: -0.8 * parseInt(parent.height()) }).animate({ top: 0 }, 350, 'linear')
        });
    }