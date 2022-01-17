function init() {
        // Add the platform as a class name immediately to avoid lots
        // of flickering
        var b = document.body;
        b.className = b.className.replace("windows", site.platform);
    }