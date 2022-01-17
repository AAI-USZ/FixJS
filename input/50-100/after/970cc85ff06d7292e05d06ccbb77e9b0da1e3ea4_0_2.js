function() {
                            if (transactions[0] == first_tx) {
                                queryAPIMultiAddress(function() {
                                    if (transactions[0] == first_tx) {
                                        apiGetRejectionReason(Crypto.util.bytesToHex(self.tx.getHash().reverse()), function(reason) {
                                            self.error(reason);
                                        }, function() {
                                            self.error('Unknown Error Pushing Transaction');
                                        });
                                    }
                                });
                            }
                        }