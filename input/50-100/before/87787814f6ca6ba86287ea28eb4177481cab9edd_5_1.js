function handleBuild() {
    var node = $(this),
        action = node.attr('id').split("-")[2];

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