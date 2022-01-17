function (button, target) {
        var offset = target.offset();
        button = button[0];
        target = target[0];
        var offsetParent = button.offsetParent;
        if (!offsetParent) {
            // Button is display=none, do not position.
            return;
        }
        var tleft = offset.left - $(offsetParent).offset().left;
        $(button).css("left", (tleft - button.offsetWidth) / offsetParent.offsetWidth * 100 + "%");
    }