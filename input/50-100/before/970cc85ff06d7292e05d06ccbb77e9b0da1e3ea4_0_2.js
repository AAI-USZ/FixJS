function() {
                                    if (transactions.length == size) {
                                        apiGetRejectionReason(Crypto.util.bytesToHex(self.tx.getHash().reverse()), function(reason) {
                                            self.error(reason);
                                        }, function() {
                                            self.error('Unknown Error Pushing Transaction');
                                        });
                                    }
                                }