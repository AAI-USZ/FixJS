function () {
            clearTimeout(resizeDelay);
            resizeDelay = resizeFirer.delay(that.options.delay);
        }