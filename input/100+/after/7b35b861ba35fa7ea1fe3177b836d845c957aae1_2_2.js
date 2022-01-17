function fadeIn() {
    fadeFactor = 0;
    clearInterval(fadeTimer);
    fadeTimer = setInterval(function() {
        fadeFactor += 0.5 * .2;
        if (fadeFactor > 1) {
            clearInterval(fadeTimer);
            fadeFactor = 1;
            // unset "already present" marker
            for (var i = 0, il = data.length; i < il; i++) {
                delete data[i][2];
            }
        }
        render();
    }, 33);
}