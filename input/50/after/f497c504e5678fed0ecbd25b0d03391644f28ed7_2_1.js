function isAccessible(tab) {
        var atab = opera.extension.tabs.getFocused();
        return !!atab && !!atab.port && tab == atab;
    }