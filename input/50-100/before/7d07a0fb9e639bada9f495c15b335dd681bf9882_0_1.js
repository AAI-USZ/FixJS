function (e) {
        var handles = this._eventHandles;

        if (handles.dataChange) {
            handles.dataChange.detach();
            this.bindUI();
        }

        if (this.tbodyNode) {
            this.render();
        }
    }