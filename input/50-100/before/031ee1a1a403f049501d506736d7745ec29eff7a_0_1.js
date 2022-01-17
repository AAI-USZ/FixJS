function () {
                var next = self.registry[this.peers.random().load];

                if (Math.random() < self.reach) {
                    return next.hop();
                } else {
                    return next;
                }
            }