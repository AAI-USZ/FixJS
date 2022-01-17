function(event) {
            req.onsuccess = req.onerror = null;
            // exists iff req.result is not null
            self.lambda(callback).call(self, event.target.result !== null)
        }