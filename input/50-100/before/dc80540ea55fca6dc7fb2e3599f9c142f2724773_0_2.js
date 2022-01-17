function doBuild() {
    if (node.hasClass("not-ready")) {
        return;
    }

    if (!settings.can(action)) {
        settings.show(action);
    }
    else {
        settings.perform(action);
    }
}