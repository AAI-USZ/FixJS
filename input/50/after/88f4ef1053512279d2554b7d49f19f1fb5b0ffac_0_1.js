function (comp, name) {
        if (!comp.data().wluiVars) {
            comp.data().wluiVars = {};
        }
        return comp.data().wluiVars[name];
    }