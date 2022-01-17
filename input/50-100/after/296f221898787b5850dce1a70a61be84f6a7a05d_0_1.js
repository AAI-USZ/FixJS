function(options) {
    options = options || {};
    this.directory = options.directory || '.';

    this.functions = {
        'print': console.log.bind(console),

        rand: function(low, high) {
            low = low || 0;
            high = high || 1;
            return Math.random() * (high - low) - low;
        },

        // Constants
        RED01: 'bullets/circleredsm.png',
        BLUE01: 'bullets/circlebluesm.png'
    };
}