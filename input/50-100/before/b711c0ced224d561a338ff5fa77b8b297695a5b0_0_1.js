function registerNavigatorEvents() {
    if (window.chrome && window.chrome.internal) {
        chrome.internal.navigator = {};
        chrome.internal.navigator.onWindowState = function (state) {};
        chrome.internal.navigator.onWindowActive = function () {
            if (onResume) {
                onResume();
            }            
        };
        chrome.internal.navigator.onWindowInactive = function () {
            if (onPause) {
                onPause();
            }            
        };
    }
}