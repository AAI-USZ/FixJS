function (ns, className, $Peers) {
    /**
     * Conceptual node. Basic component of the association engine.
     * @class Represents a graph node.
     * @requires prime.Peers
     */
    var self = prime.Node = troop.base.extend()
        .addPublic({
            /**
             * System-wide registry of nodes
             * @static
             */
            registry: {},

            /**
             * Probability of sub-sequential hops
             * @static
             * @type {number}
             */
            reach: 0.5
        }).addMethod({
            //////////////////////////////
            // OOP

            /**
             * Initializes node.
             * @constructs
             * @param load {string} Node load.
             * @param [peers] {prime.Peers} Initial node peers.
             */
            init: function (load, peers) {
                /**
                 * String wrapped inside node.
                 * @type {string}
                 */
                this.load = load;

                /**
                 * Collection of nodes connected to current node
                 * @type {prime.Peers}
                 */
                this.peers = peers || $Peers.create();
            },

            //////////////////////////////
            // Utils

            /**
             * Adds node to lookup when it's not already there.
             */
            register: function () {
                var load = this.load,
                    registry = self.registry;

                if (!registry.hasOwnProperty(load)) {
                    registry[load] = this;
                }

                return this;
            },

            /**
             * Resets datastore by emptying the registry.
             * @static
             */
            reset: function () {
                this.registry = {};
            },

            //////////////////////////////
            // Graph methods

            /**
             * Retrieves a peer object for a given node.
             * When node is not a peer, returns undefined.
             * @param node {prime.Node}
             * @return {prime.Peer}
             */
            peer: function (node) {
                return this.peers.byLoad[node.load];
            },

            /**
             * Hops to a peer node randomly, weighted by tread.
             * @returns {prime.Node}
             */
            hop: function () {
                var next = self.registry[this.peers.random().load];

                if (Math.random() < self.reach) {
                    next = next.hop();
                }

                return next;
            },

            /**
             * Strengthens connection weight for a single peer.
             */
            to: function () {
                var last = arguments.length - 1,
                    node, wear,
                    i;

                if (typeof arguments[last] === 'number') {
                    wear = arguments[last];
                    last--;
                }

                for (i = 0; i <= last; i++) {
                    node = arguments[i];
                    this.peers.tread(node.load, wear);
                    node.peers.tread(this.load, wear);
                }

                return this;
            },

            //////////////////////////////
            // JSON

            /**
             * Reconstructs Node object from JSON data.
             * @static
             * @param json {object} De-serialized JSON.
             * @param json.load {string}
             * @param json.peers {object}
             * @return {prime.Node}
             */
            fromJSON: function (json) {
                return self.create(
                    json.load,

                    // initializing peers form JSON
                    $Peers.fromJSON(json.peers)
                );
            }
        });

    return self;
}