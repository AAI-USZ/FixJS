function () {
                var next = self.registry[this.peers.random().load];

                if (Math.random() < self.reach) {
                    next = next.hop();
                }

                return next;
            }