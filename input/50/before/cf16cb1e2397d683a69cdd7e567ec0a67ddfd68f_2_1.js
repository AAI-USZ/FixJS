function _setPayDesk ($this, payDesk) {
        _sendToSocket('action: setPayDesk ' + payDesk);
        $this.data('payDesk', payDesk);
    }