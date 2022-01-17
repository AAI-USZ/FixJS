function (ns, className, $utils) {
    /**
     * @class Represents connection to another node.
     * @requires prime.Node
     */
    var self = prime.Index = troop.base.extend()
        .addMethod({
            init: function () {
                /**
                 * List of peers in order identical to _totals.
                 * @type {number[]}
                 * @private
                 */
                this._weights = [];

                /**
                 * Sorted index of total weights of preceding entries.
                 * Total weight is the cumulative weight of all slots.
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
                 * (Both loads and index positions are unique.)
                 * @type {Object}
                 * @private
                 */
                this._lookup = {};

                /**
                 * Lookup for empty index entries first by weight, then by index position.
                 * Incoming entries first check here for a suitable position.
                 * @type {Object}
                 * @private
                 */
                this._slots = {};

                /**
                 * Number of empty slots.
                 * @type {Number}
                 */
                this.slotCount = 0;
            }
        }).addPrivateMethod({
            /**
             * Performs binary search in the index.
             * @this {number[]} Array to perform search on.
             * @param value {number} Value searched.
             * @param [start] {number} Start position of search range. Default: 0.
             * @param [end] {number} Ending position of search range. Default: this.length - 1.
             * @private
             * @static
             */
            _bsearch: function (value, start, end) {
                start = start || 0;
                end = end || this.length - 1;

                var pos = Math.floor((start + end) / 2),
                    hit = this[pos];

                if (hit === value) {
                    // perfect hit
                    return pos;
                } else if (this[end] <= value) {
                    // end of range hit
                    return end;
                } else if (end - start === 1) {
                    // between two adjacent values
                    return start;
                } else if (hit > value) {
                    // narrowing range to lower half
                    return self._bsearch.call(this, value, start, pos);
                } else if (hit < value) {
                    // narrowing range to upper half
                    return self._bsearch.call(this, value, pos, end);
                }
            }
        }).addMethod({
            /**
             * Adds index entry.
             * @param load {string} Entry load.
             * @param weight {number} Entry weight.
             */
            add: function (load, weight) {
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
            },

            /**
             * Removes entry from index by adding position to slots.
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

                return this;
            },

            /**
             * Rebuilds index, gets rid of unused entries.
             */
            rebuild: function () {
                if (this.slotCount === 0) {
                    // there are no empty slots, rebuild is unnecessary
                    return this;
                }

                // backing up buffers
                var loads = this._loads,
                    weights = this._weights,
                    i, load, weight;

                // re-setting buffers
                this.init();

                // re-adding entries one by one
                for (i = 0; i < loads.length; i++) {
                    load = loads[i];
                    weight = weights[i];
                    if (typeof load !== 'undefined') {
                        this.add(load, weight);
                    }
                }

                return this;
            },

            /**
             * Retrieves an entry based on total weight.
             * @param total {number} Number between zero and this.lastTotal
             * @return {string} Load of requested entry.
             */
            get: function (total) {
                return this._loads[this._bsearch.call(this._totals, total)];
            },

            /**
             * Retrieves a random slot based on total weight.
             * @return {string} Random entry load.
             */
            random: function () {
                var total = Math.random() * this.nextTotal,
                    load = this._loads[this._bsearch.call(this._totals, total)];

                if (typeof load === 'undefined') {
                    // empty slot was hit, trying again
                    return this.random();
                } else {
                    // valid entry was hit
                    return load;
                }
            }
        });

    return self;
}