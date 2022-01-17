function (node, wear) {
                var
                    /** @type string */
                    load = node.load,

                    /** @type prime.Peer */
                    peer,

                    /** @type number */
                    treadBefore, treadAfter;

                // checking whether node is already among peers
                if (this._byLoad.hasOwnProperty(load)) {
                    // obtaining peer
                    peer = this._byLoad[load];

                    // increasing tread on existing connection
                    treadBefore = peer.tread;
                    treadAfter = peer
                        .wear(wear)
                        .tread;

                    // removing old tread from lookup
                    $utils.unset(this._byTread, treadBefore, load);
                } else {
                    // creating peer
                    peer = $peer.create(node, wear);

                    // setting tread on new connection
                    treadBefore = 0;
                    treadAfter = peer.tread;

                    // adding new peer to lookup
                    $utils.set(this._byLoad, load, peer);
                }

                // updating tread in lookup
                $utils.set(this._byTread, treadAfter, load, peer);

                // updating total tread
                this.totalTread += treadAfter - treadBefore;

                return this;
            }