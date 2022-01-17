function (load, weight) {
                var slots = this._slots,
                    pos; // position of new entry in the array buffers

                if (slots.hasOwnProperty(weight)) {
                    // there is an available empty slot
                    pos = $utils.firstProperty(slots[weight]);

                    // filling slot
                    this._loads[pos] = load;
                    this._lookup[load] = parseInt(pos, 10);

                    // removing slot
                    delete slots[weight][pos];
                    this.slotCount--;
                    if ($utils.isEmpty(slots[weight])) {
                        // all empty slots for `weight` used up
                        delete slots[weight];
                    }
                } else {
                    // no empty spot available
                    // adding new entry to index
                    this._lookup[load] = this._loads.length;
                    this._loads.push(load);
                    this._totals.push(this.nextTotal);
                    this._weights.push(weight);
                    this.nextTotal += weight;
                }

                return this;
            }