function isAccessible (tab) {
        return !!tab && (v12 ? !!tab.port && tab.readyState === 'complete' : true);
    }