function ($) {
    "use strict";
    fluid.defaults("automm.instrument", {
        gradeNames: ["fluid.viewComponent", "autoInit"],
        postInitFunction: "automm.instrument.postInitFunction",

        model: {
            afour: 69,     // The note number of A4... this could probably be calculate based on all the other stuff (probably should be)
            afourFreq: 440, // Standard freq for A4, used to calculate all other notes
            firstNote: 60, // Middle C
            octaves: 1,
            octaveNotes: 12,
            padding: 50,
            pattern: ['white', 'black', 'white', 'black', 'white', 'white', 'black', 'white', 'black', 'white', 'black', 'white'],
            keys: {
                white: {width: 50, height: 200, stroke: "black", fill: "white", highlight: "yellow", notes: []},
                black: {width: 30, height: 125, stroke: "black", fill: "black", highlight: "yellow", notes: []}
            },
            keyTypes: {
                keyOne: {width: 50, height: 200, stroke: "black", fill: "white", highlight: "yellow"},
                keyTwo: {width: 30, height: 125, stroke: "black", fill: "black", highlight: "yellow"}
            }
        },

        events: {
            onNote: null,
            afterNote: null,
            afterInstrumentUpdate: null
        },

        components: {
            piano: {
                type: "automm.piano",
                container: "{instrument}.container",
                options: {
                    model: {
                        firstNote: "{instrument}.model.firstNote", // Middle C
                        octaves: "{instrument}.model.octaves",
                        octaveNotes: "{instrument}.model.octaveNotes",
                        padding: "{instrument}.model.padding",
                        pattern: "{instrument}.model.pattern",
                        keys: "{instrument}.model.keys",
                        keyTypes: "{instrument}.model.keyTypes"
                    },
                    events: {
                        onNote: "{instrument}.events.onNote",
                        afterNote: "{instrument}.events.afterNote",
                        afterInstrumentUpdate: "{instrument}.events.afterInstrumentUpdate"
                    }
                }
            },

            oscillator: {
                type: "automm.oscillator",
                options: {
                    model: {
                        afour: "{instrument}.afour",
                        afourFreq: "{instrument}.afourFreq",
                        ocaveNotes: "{instrument}.octaveNotes"
                    },
                    events: {
                        onNote: "{instrument}.events.onNote",
                        afterNote: "{instrument}.events.afterNote",
                        afterInstrumentUpdate: "{instrument}.events.afterInstrumentUpdate"
                    }
                }
            }
        }
    });

    automm.instrument.postInitFunction = function (that) {
        that.update = function (param, value) {
            that.applier.requestChange(param, value);
            that.events.afterInstrumentUpdate.fire(param, value);
            return that;
        };
    };
}