function init() {
        // Add the platform as a class name immediately to avoid lots
        // of flickering
        var b = document.body;
        b.className = b.className.replace("windows", site.platform);

        // Add class to reflect javascript availability for CSS
        var h = document.documentElement;
        h.className = h.className.replace(/\bno-js\b/,'js');
    }