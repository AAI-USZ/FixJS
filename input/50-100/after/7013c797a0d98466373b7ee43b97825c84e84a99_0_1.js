function (e) {
        var handles = this._eventHandles;

        if (handles.dataChange) {
            handles.dataChange.detach();
            delete handles.dataChange;
            this.bindUI();
        }

        if (this.tbodyNode) {
            this.render();
        }
    }