function(ap) {
        let res = this._findExistingNetwork(ap);
        if (res == null) {
            // Uhm... stale signal?
            return;
        }

        let network = this._networks[res.network];
        network.accessPoints.splice(res.ap, 1);
        Util.insertSorted(network.accessPoints, ap, function(one, two) {
            return two.strength - one.strength;
        });

        this._networks.splice(res.network, 1);
        let newPos = Util.insertSorted(this._networks, network, Lang.bind(this, this._networkSortFunction));

        if (newPos != res.network) {
            this._clearSection();
            this._queueCreateSection();
        }
    }