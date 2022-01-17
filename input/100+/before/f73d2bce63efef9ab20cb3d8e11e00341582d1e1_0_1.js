function findAnchor(desc, workspace) {
        var iObject_interface, iobject;
        switch (desc.type) {
        case 'iwidget':
            if (this.igadgets[desc.id] != null) {
                return this.igadgets[desc.id].getAnchor(desc.endpoint);
            } else {
                iobject = workspace.getIgadget(desc.id);
                if (iobject != null) {
                    iObject_interface = this.addIGadget(this, iobject);
                    //gadget_interface.setPosition({posX: 0, posY: 0});
                    this.mini_widgets[iobject.getId()].disable();
                } else {
                    //ERROR
                    //console.debug("inconsistent wiring, gadget referenced not found");
                }
            }
            break;
        case 'ioperator':
            if (this.ioperators[desc.id] != null) {
                return this.ioperators[desc.id].getAnchor(desc.endpoint);
            }
        }
    }