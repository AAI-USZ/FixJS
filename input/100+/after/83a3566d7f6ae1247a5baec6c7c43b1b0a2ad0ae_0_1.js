function() {
    // Backplane is a function that accepts a function to be run onInit
    var BP = function(fn) {
        if (Backplane.getChannelID()) fn();
        else {
            Backplane.onInit = (function() {
                var original_onInit = Backplane.onInit;
                return function() {
                    original_onInit();
                    fn();
                };
            })();
        }
    };
    BP.log = function(msg) {
        if (window.console && window.console.log) {
            console.log("Backplane: " + msg);
        }
    }
    BP.warn = function(msg) {
        if (window.console && window.console.warn) {
            console.warn("Backplane WARNING: " + msg)
        }
    }
    BP.error = function(msg) {
        if (window.console && window.console.error) {
            console.error("Backplane ERROR: " + msg);
        }
    }
    BP.version = "2.0.1";
    BP.token = null;
    BP.refresh_token = null;
    BP.channelName = null;
    BP.block = 0;
    BP.config = {};
    BP.initialized = false;
    BP.firstFrameReceived = false;
    BP.cachedMessages = {};
    BP.cachedMessagesIndex = [];
    BP.cacheMax = 0;
    BP.subscribers = {};
    BP.awaiting = {
        "since": 0,
        "until": 0,
        "queue": []
    };
    BP.intervals = {
        "min": 1,
        "frequent": 5,
        "regular": 20,
        "slowdown": 120
    };
    BP.onInit = function() {};
    BP.log("backplane2.js loaded");
    return BP;
}