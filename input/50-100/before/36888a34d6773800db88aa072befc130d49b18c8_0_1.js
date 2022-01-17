function() {
        this.parent();

        for (let i = 0; i < this._networks.length; i++)
            this._networks[i].item = null;
        this._overflowItem = null;
    }