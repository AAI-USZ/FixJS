function(btnName) {
        // Controls are shown only for Virtual Machines
        this._set(btnName, !this.compute.isPhysical());
    }