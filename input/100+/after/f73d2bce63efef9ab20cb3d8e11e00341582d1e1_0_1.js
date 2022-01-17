function findAnchor(desc, workspace) {
        var iwidget_interface, iwidget;

        switch (desc.type) {
        case 'iwidget':
            if (this.igadgets[desc.id] != null) {
                return this.igadgets[desc.id].getAnchor(desc.endpoint);
            } else {
                iwidget = workspace.getIgadget(desc.id);
                if (iwidget != null) {
                    iwidget_interface = this.addIGadget(this, iwidget);
                    iwidget_interface.setPosition({posX: 0, posY: 0});
                    this.mini_widgets[iwidget.getId()].disable();
                } else {
                    throw new Error('Widget not found');
                }
                return iwidget_interface.getAnchor(desc.endpoint);
            }
            break;
        case 'ioperator':
            if (this.ioperators[desc.id] != null) {
                return this.ioperators[desc.id].getAnchor(desc.endpoint);
            }
        }
    }