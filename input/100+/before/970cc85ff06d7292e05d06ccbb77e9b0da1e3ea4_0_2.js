function() {
            if (this.is_cancelled) //Only call once
                return;

            var self = this;

            try {
                var s = this.tx.serialize();

                var hex = Crypto.util.bytesToHex(s);

                if (hex.length >= 32768) {
                    this.error('My wallet cannot handle transactions over 32KB in size. Please try splitting your transaction,');
                }

                setLoadingText('Sending Transaction');

                var size = transactions.length;

                self.has_pushed = true;

                $.post("/pushtx", { format : "plain", tx: hex }, function(data) {
                    try {
                        //If we haven't received a new transaction after sometime call a manual update
                        setTimeout(function() {
                            if (transactions.length == size) {
                                queryAPIMultiAddress(function() {
                                    if (transactions.length == size) {
                                        apiGetRejectionReason(Crypto.util.bytesToHex(self.tx.getHash().reverse()), function(reason) {
                                            self.error(reason);
                                        }, function() {
                                            self.error('Unknown Error Pushing Transaction');
                                        });
                                    }
                                });
                            }
                        }, 3000);

                        self.success();
                    } catch (e) {
                        self.error(e);
                    }
                }).error(function(data) {
                        self.error(data ? data.responseText : null);
                    });

            } catch (e) {
                self.error(e);
            }
        }