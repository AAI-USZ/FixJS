function (ns, className, $utils) {
    /**
     * @class Represents connection to another node.
     * @requires prime.Node
     */
    var self = prime.PeerIndex = troop.base.extend()
        .addMethod({
            init: function () {
                /**
                 * List of peers in order identical to _index.
                 * @type {number[]}
                 * @private
                 */
                this._weights = [];

                /**
                 * Sorted index of total weights.
                 * Total weight is the cumulative weight of all slots
                 * @type {number[]}
                 * @private
                 */
                this._totals = [];

                /**
                 * Next total weight. Equals to cumulative weight of all entries.
                 * @type {Number}
                 */
                this.nextTotal = 0;

                /**
                 * List of loads.
                 * @type {string[]}
                 * @private
                 */
                this._loads = [];

                /**
                 * Associates loads with their positions in the index.
                 * @type {Object}
                 * @private
                 */
                this._lookup = {};

                /**
                 * Lookup for empty index spots indexed by weight first, then by position in _peers.
                 * @type {Object}
                 * @private
                 */
                this._slots = {};
                this.slotCount = 0;
            }
        }).addPrivateMethod({
            /**
             * Performs binary search in the index.
             * @param value {number} Value searched.
             * @param [start] {number} Start index of search range. Default: 0.
             * @param [end] {number} Ending index of search range. Default: _index.length - 1.
             * @private
             */
            _bsearch: function (value, start, end) {
                start = start || 0;
                end = end || this._totals.length - 1;

                var index = this._totals,
                    pos = Math.floor((start + end) / 2),
                    hit = index[pos];

                if (hit === value) {
                    // perfect hit
                    return pos;
                } else if (index[end] === value) {
                    // end of range hit
                    return end;
                } else if (end - start === 1) {
                    // between two adjacent values
                    return start;
                } else if (hit > value) {
                    // narrowing range to lower half
                    return this._bsearch(value, start, pos);
                } else if (hit < value) {
                    // narrowing range to upper half
                    return this._bsearch(value, pos, end);
                }
            }
        }).addMethod({
            /**
             * Adds index entry.
             * @param load {string} Entry load.
             * @param weight {number} Entry weight.
             * @return {number} Position of (new) entry in the index.
             */
            add: function (load, weight) {
                var slots = this._slots,
                    pos; // position of the new entry (in _weights and _totals)

                if (slots.hasOwnProperty(weight)) {
                    // there is an available empty slot
                    pos = $utils.firstProperty(slots[weight]);

                    // filling slot
                    this._loads[pos] = load;
                    this._lookup[load] = pos;

                    // removing position from slots
                    delete slots[weight][pos];
                    if ($utils.isEmpty(slots[weight])) {
                        // all empty slots for `weight` used up
                        delete slots[weight];
                        this.slotCount--;
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
            },

            /**
             * Removes entry from index by marking its position as empty.
             * @param load {string} Load of entry to be removed.
             */
            remove: function (load) {
                var pos = this._lookup[load],
                    slots = this._slots,
                    weight = this._weights[pos];

                // removing from loads
                delete this._loads[this._lookup[load]];
                delete this._lookup[load];

                // adding position to slots
                if (!slots.hasOwnProperty(weight)) {
                    slots[weight] = {};
                }
                slots[weight][pos] = true;
                this.slotCount++;
            },

            /**
             * Retrieves a slot based on its total weight.
             * @param total {number} Number between zero and this.lastTotal
             * @return {string} Load of requested entry.
             */
            get: function (total) {
                return this._loads[this._bsearch(total)];
            },

            /**
             * Retrieves a random slot based on total weights.
             */
            random: function () {
                var total = Math.random() * this.nextTotal;
                return this._bsearch(total);
            }
        });

    return self;
}