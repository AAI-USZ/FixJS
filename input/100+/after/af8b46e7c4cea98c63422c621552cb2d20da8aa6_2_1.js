function() {
        this.addEvents('start', 'suspend', 'graceful', 'stop', 'details', 'edit');

        var buttons = [
            this._makeButton('start', "Start", "Start machine", true, {
                title: 'Starting a VM',
                text: 'Are you sure you want to boot this VM?'
            }),
            this._makeButton('suspend', "Suspend", "Suspend machine", true),
            this._makeButton('graceful', "Shut down", "Shut down machine", true, {
                title: 'Shutting down a VM',
                text: 'Are you sure? All of the processes inside a VM will be stoppped'
            }),
            this._makeButton('stop', "Force stop", "Force stop machine", true)
        ];

        if (!this.disableDetails) {
            buttons[buttons.length] = this._makeButton('details', "Details", "Machine details", false);
        }
        if(!this.compute.isPhysical()){
            buttons[buttons.length] = this._makeButton('delete', "Delete", "Delete machine", false, {
                title: 'Deleting a VM',
                text: 'Are you sure you want to delete this VM?'
            });
            buttons[buttons.length] = this._makeButton('edit', "Edit", "Edit machine", false);
        }
        this.items = buttons;

        this.callParent(arguments);

        this._setState(this.initialState);
    }