function registerApplicationEvents() {
    if (window.chrome && window.chrome.internal) {
        chrome.internal.application = {};
        chrome.internal.application.onWindowState = function (state) {};
        chrome.internal.application.onWindowActive = function () {
            if (onResume) {
                onResume();
            }            
        };
        chrome.internal.application.onWindowInactive = function () {
            if (onPause) {
                onPause();
            }            
        };
    }
}