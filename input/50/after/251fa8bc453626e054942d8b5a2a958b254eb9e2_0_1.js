function initMain() {
        for(var factory in modules) {
            window[factory] = modules[factory];
        }
        return {};
    }