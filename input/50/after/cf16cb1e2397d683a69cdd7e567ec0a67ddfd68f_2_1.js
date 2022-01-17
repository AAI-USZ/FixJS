function _setPayDesk ($this, payDesk) {
        console.log('setpaydesk');
        _sendToSocket('action: setPayDesk ' + payDesk);
        $this.data('payDesk', payDesk);
    }