function () {
        if(!this.socket) {
            this.socket = new WebSocket(this._c.service, "xmpp");
            this.socket.onopen = this._onOpen.bind(this);
            this.socket.onerror = this._onError.bind(this);
            this.socket.onclose = this._onClose.bind(this);
            this.socket.onmessage = this._connect_cb_wrapper.bind(this);
        }
    }