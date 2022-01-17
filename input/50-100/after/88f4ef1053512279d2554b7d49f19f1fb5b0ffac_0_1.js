function (comp, name, value) {
        if (!comp.data().wluiVars) {
            comp.data().wluiVars = {};
        }
        comp.data().wluiVars[name] = value;
        return true;
    }