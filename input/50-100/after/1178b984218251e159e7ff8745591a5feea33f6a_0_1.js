function (name, data) {
    var design = this.getDesign();
    if (!design) {
        if ($.rib.debug('warn') >= 2) {
            console.warn("Warning: no root design found to fire model event");
        }
        return;
    }
    design.fireEvent(name, data);
}