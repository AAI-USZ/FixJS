function isAccessible() {
        var atab = opera.extension.tabs.getFocused();
        return !!atab && (typeof atab.port !== 'undefined' ? !!atab.port : true);
    }